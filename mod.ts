/**
 * url-to-md — Programmatic API
 *
 * @example
 * ```ts
 * import { urlToMarkdown, htmlToMarkdown } from 'url-to-md';
 *
 * const result = await urlToMarkdown('https://example.com', { selector: 'main' });
 * console.log(result.markdown);
 *
 * const html = '<h1>Hello</h1><p>World</p>';
 * const { markdown } = htmlToMarkdown(html);
 * ```
 */
export { urlToMarkdown, htmlToMarkdown, createTurndownService } from './lib/converter';
export type { ConvertOptions, ConvertResult } from './lib/converter';
