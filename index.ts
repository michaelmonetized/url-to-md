#!/usr/bin/env bun
import { Command } from 'commander';
import { mkdir } from 'node:fs/promises';
import { dirname } from 'node:path';
import { existsSync } from 'node:fs';
import { urlToMarkdown } from './lib/converter';

// Read version from package.json (single source of truth)
const pkg = await Bun.file(new URL('./package.json', import.meta.url)).json();

const program = new Command();

program
  .name('url-to-md')
  .description('Convert a URL to markdown with advanced table support and media preservation')
  .version(pkg.version)
  .argument('[url]', 'The URL to convert')
  .argument('[selector]', 'The CSS selector to use for the main content', "[role='main']")
  .argument('[output]', 'The output file', 'README.md')
  .option('-u, --url <url>', 'The URL to convert')
  .option('-s, --selector <selector>', 'The CSS selector to use for the main content')
  .option('-o, --output <output>', 'The output file')
  .action(async (urlArg, selectorArg, outputArg, options) => {
    const url = options.url || urlArg;
    const selector = options.selector || selectorArg || "[role='main']";
    const output = options.output || outputArg || 'README.md';

    if (!url) {
      console.error('Error: URL is required');
      console.log('\nUsage: url-to-md <url> [selector] [output]');
      console.log('   or: url-to-md --url <url> --selector <selector> --output <output>');
      process.exit(1);
    }

    try {
      console.log(`Fetching ${url}...`);
      const result = await urlToMarkdown(url, { selector });

      if (!result.selectorMatched) {
        console.warn(`Warning: No elements found with selector "${selector}". Using entire body.`);
      }

      // Create output directory if path contains slashes
      if (output.includes('/')) {
        const dir = dirname(output);
        if (!existsSync(dir)) {
          await mkdir(dir, { recursive: true });
          console.log(`✓ Created directory: ${dir}`);
        }
      }

      await Bun.write(output, result.markdown);

      console.log(`✓ Successfully converted to markdown`);
      console.log(`✓ Output saved to: ${output}`);
    } catch (error) {
      console.error('Error:', error instanceof Error ? error.message : String(error));
      process.exit(1);
    }
  });

program.parse();
