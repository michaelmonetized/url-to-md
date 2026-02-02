#!/usr/bin/env bun
import { Command } from 'commander';
import TurndownService from 'turndown';
import { load } from 'cheerio';
import { mkdir } from 'node:fs/promises';
import { dirname } from 'node:path';
import { existsSync } from 'node:fs';

const program = new Command();

program
  .name('url-to-md')
  .description('Convert a URL to markdown with advanced table support and media preservation')
  .version('1.0.0')
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
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const html = await response.text();
      const $ = load(html);

      let content;
      const selected = $(selector);

      if (selected.length === 0) {
        console.warn(`Warning: No elements found with selector "${selector}". Using entire body.`);
        content = $('body').html() || html;
      } else {
        content = selected.html() || '';
      }

      const turndownService = new TurndownService({
        headingStyle: 'atx',
        hr: '---',
        bulletListMarker: '-',
        codeBlockStyle: 'fenced',
        emDelimiter: '_',
      });

      // Add support for tables
      turndownService.addRule('tableCell', {
        filter: ['th', 'td'],
        replacement: function (content, node) {
          return content.trim().replace(/\n/g, ' ') + ' |';
        },
      });

      turndownService.addRule('tableRow', {
        filter: 'tr',
        replacement: function (content, node) {
          const cells = content.trim();
          return cells ? '| ' + cells + '\n' : '';
        },
      });

      turndownService.addRule('table', {
        filter: 'table',
        replacement: function (content, node) {
          const rows = content.trim().split('\n');
          if (rows.length === 0) return '';

          const headerRow = rows[0];
          const separator = headerRow
            .split('|')
            .filter(cell => cell.trim())
            .map(() => '---')
            .join(' | ');

          return rows[0] + '| ' + separator + ' |\n' + rows.slice(1).join('');
        },
      });

      // Preserve images with alt text and src
      turndownService.addRule('images', {
        filter: 'img',
        replacement: function (content, node: any) {
          const alt = node.getAttribute('alt') || '';
          const src = node.getAttribute('src') || '';
          const title = node.getAttribute('title');

          if (!src) return '';

          const titlePart = title ? ` "${title}"` : '';
          return `![${alt}](${src}${titlePart})`;
        },
      });

      // Preserve videos
      turndownService.addRule('videos', {
        filter: 'video',
        replacement: function (content, node: any) {
          const src = node.getAttribute('src') || node.querySelector('source')?.getAttribute('src') || '';
          const poster = node.getAttribute('poster');

          if (!src) return content;

          let markdown = `\n\n**[Video](${src})**\n\n`;
          if (poster) {
            markdown += `[![Video Thumbnail](${poster})](${src})\n\n`;
          }
          return markdown;
        },
      });

      // Preserve SVGs as-is
      turndownService.addRule('svg', {
        filter: 'svg',
        replacement: function (content, node: any) {
          return '\n\n```svg\n' + node.outerHTML + '\n```\n\n';
        },
      });

      // Preserve iframes (for embedded content)
      turndownService.addRule('iframe', {
        filter: 'iframe',
        replacement: function (content, node: any) {
          const src = node.getAttribute('src') || '';
          return src ? `\n\n**[Embedded Content](${src})**\n\n` : '';
        },
      });

      const markdown = turndownService.turndown(content);

      // Create output directory if path contains slashes
      if (output.includes('/')) {
        const dir = dirname(output);
        if (!existsSync(dir)) {
          await mkdir(dir, { recursive: true });
          console.log(`✓ Created directory: ${dir}`);
        }
      }

      await Bun.write(output, markdown);

      console.log(`✓ Successfully converted to markdown`);
      console.log(`✓ Output saved to: ${output}`);

    } catch (error) {
      console.error('Error:', error instanceof Error ? error.message : String(error));
      process.exit(1);
    }
  });

program.parse();
