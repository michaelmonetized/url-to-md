import TurndownService from 'turndown';
import { load } from 'cheerio';

export interface ConvertOptions {
  /** CSS selector for main content (default: "[role='main']") */
  selector?: string;
  /** Custom User-Agent header */
  userAgent?: string;
  /** Fetch timeout in ms (default: 10000) */
  timeout?: number;
}

export interface ConvertResult {
  markdown: string;
  /** Whether the selector matched or fell back to body */
  selectorMatched: boolean;
}

/**
 * Create a configured TurndownService with table, media, and SVG support.
 */
export function createTurndownService(): TurndownService {
  const turndownService = new TurndownService({
    headingStyle: 'atx',
    hr: '---',
    bulletListMarker: '-',
    codeBlockStyle: 'fenced',
    emDelimiter: '_',
  });

  turndownService.addRule('tableCell', {
    filter: ['th', 'td'],
    replacement: function (content) {
      return content.trim().replace(/\n/g, ' ') + ' |';
    },
  });

  turndownService.addRule('tableRow', {
    filter: 'tr',
    replacement: function (content) {
      const cells = content.trim();
      return cells ? '| ' + cells + '\n' : '';
    },
  });

  turndownService.addRule('table', {
    filter: 'table',
    replacement: function (content) {
      const rows = content.trim().split('\n').filter(row => row.trim());
      if (rows.length === 0) return '';
      const headerRow = rows[0];
      const separator = headerRow
        .split('|')
        .filter(cell => cell.trim())
        .map(() => '---')
        .join(' | ');
      return '\n\n' + rows[0] + '\n| ' + separator + ' |\n' + rows.slice(1).join('\n') + '\n\n';
    },
  });

  turndownService.addRule('images', {
    filter: 'img',
    replacement: function (_content, node: any) {
      const alt = node.getAttribute('alt') || '';
      const src = node.getAttribute('src') || '';
      const title = node.getAttribute('title');
      if (!src) return '';
      const titlePart = title ? ` "${title}"` : '';
      return `![${alt}](${src}${titlePart})`;
    },
  });

  turndownService.addRule('videos', {
    filter: 'video',
    replacement: function (content, node: any) {
      const $ = load('<div></div>');
      const src = node.getAttribute('src') || $(node).find('source').attr('src') || '';
      const poster = node.getAttribute('poster');
      if (!src) return content;
      let markdown = `\n\n**[Video](${src})**\n\n`;
      if (poster) {
        markdown += `[![Video Thumbnail](${poster})](${src})\n\n`;
      }
      return markdown;
    },
  });

  turndownService.addRule('svg', {
    filter: 'svg',
    replacement: function (_content, node: any) {
      const $ = load('<div></div>');
      return '\n\n```svg\n' + $.html(node) + '\n```\n\n';
    },
  });

  turndownService.addRule('iframe', {
    filter: 'iframe',
    replacement: function (_content, node: any) {
      const src = node.getAttribute('src') || '';
      return src ? `\n\n**[Embedded Content](${src})**\n\n` : '';
    },
  });

  return turndownService;
}

/**
 * Convert HTML string to markdown.
 */
export function htmlToMarkdown(html: string, options: ConvertOptions = {}): ConvertResult {
  const selector = options.selector || "[role='main']";
  const $ = load(html);
  let selectorMatched = true;

  let content: string;
  const selected = $(selector);
  if (selected.length === 0) {
    selectorMatched = false;
    content = $('body').html() || html;
  } else {
    content = selected.html() || '';
  }

  const turndownService = createTurndownService();
  const markdown = turndownService.turndown(content);

  return { markdown, selectorMatched };
}

/**
 * Fetch a URL and convert to markdown.
 */
export async function urlToMarkdown(url: string, options: ConvertOptions = {}): Promise<ConvertResult> {
  const parsedUrl = new URL(url);
  if (!['http:', 'https:'].includes(parsedUrl.protocol)) {
    throw new Error('URL must use http or https protocol');
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), options.timeout || 10000);

  const response = await fetch(url, {
    signal: controller.signal,
    headers: {
      'User-Agent': options.userAgent || 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    },
  });
  clearTimeout(timeout);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const html = await response.text();
  return htmlToMarkdown(html, options);
}
