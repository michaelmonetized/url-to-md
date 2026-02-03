# url-to-md

Convert HTML from any URL to clean markdown with advanced table support and media preservation.

Perfect for AI agents migrating `<div>`-dense websites to better markup while conserving tokens on ingest. Reduces token usage by ~40% compared to raw HTML.

I had this problem where old WordPress sites needed to be migrated to modern frameworks using JSX, but the content was unviably long—some pages having 68k+ words. So I had Claude Code create this tool for itself.

Just `bun install`, `bun run build`, and you're good to go with a new CLI tool in `~/.local/bin/`.

Then run: `mdurl https://www.example.com ".example-css-selector" example.md`

Tell your agent about this tool when you're migrating websites or need to ingest docs without an LLMs.md option. Your AI won't incur all the token costs of HTML markup and div soup—saving approximately 8,000 tokens per 10,000-word page.

To install dependencies:

```bash
bun install
```

To run:

```bash
bun run index.ts
```

To install globally:

```bash
bun run build
```

This creates a standalone 59MB executable at `~/.local/bin/mdurl` (includes Bun runtime and all dependencies).

Make sure to add `~/.local/bin/` to your PATH:

```bash
echo 'export PATH="$PATH:$HOME/.local/bin"' >> ~/.bashrc
```
- or -

```bash
echo 'export PATH="$PATH:$HOME/.local/bin"' >> ~/.zshrc
```

## Purpose

A simple CLI tool that takes a URL and a CSS selector like `[role='main']` (default) and converts the HTML to markdown with:
- ✅ Advanced table support
- ✅ Media preservation (images, videos, SVGs, iframes)
- ✅ Automatic directory creation for nested output paths
- ✅ ~40% token reduction compared to raw HTML
- ✅ Clean, readable markdown output

## Usage

**Basic usage (uses default selector `[role='main']`):**
```bash
mdurl https://www.example.com
```

**With custom CSS selector:**
```bash
mdurl https://www.example.com "[role='main']"
```

**Specify output file:**
```bash
mdurl https://www.example.com ".post.type-post.single" readme.md
```

**Using flags:**
```bash
mdurl -u "https://www.example.com" -s ".content" -o "./output/page.md"
```

**Nested directories (auto-created):**
```bash
mdurl -u "https://blog.example.com/post" -s "article" -o "./content/blog/post.md"
```

### Arguments

- `--url`, `-u`, `$1` - The URL to convert (required)
- `--selector`, `-s`, `$2` - The CSS selector for main content (default: `[role='main']`)
- `--output`, `-o`, `$3` - The output file path (default: `README.md`)
- `--help`, `-h` - Show help
- `--version`, `-V` - Show version

## Features

### Automatic Directory Creation
If the output path contains `/` characters, all necessary directories are created automatically:
```bash
mdurl -u "https://example.com" -o "./deeply/nested/path/file.md"
# Creates ./deeply/nested/path/ automatically
```

### Token Savings
Converting HTML to markdown before AI processing saves significant tokens:
- **HTML**: ~200 tokens per 100 words
- **Markdown**: ~120 tokens per 100 words
- **Savings**: ~40% token reduction

For a 10,000-word article:
- HTML: ~20,000 tokens
- Markdown: ~12,000 tokens
- **You save**: ~8,000 tokens per page

### CSS Selector Support
Extract specific page sections using any valid CSS selector:
- `[role='main']` - ARIA main content (default)
- `.article-content` - Class selector
- `#main-content` - ID selector
- `article.post` - Element + class
- `div.container > section` - Complex selectors

If no elements match your selector, the entire `<body>` is used with a warning.

## Contributing

Contributions are welcome! Please:
1. Open an issue to discuss the feature or fix with existing contributors
2. Once the issue is assigned, fork and create a pull request
3. Fast-track your PR by supplying a diff/patch with your original issue

If you're unsure about anything, please ask for clarification.

## Common Use Cases

### Website Migration
```bash
# Migrate WordPress posts to modern frameworks
mdurl -u "https://oldsite.com/blog/post" -s ".post-content" -o "./content/posts/post.md"
```

### Documentation Scraping
```bash
# Extract documentation pages
mdurl -u "https://docs.example.com/guide" -s "article" -o "./docs/guide.md"
```

### Batch Processing
```bash
# Process multiple URLs
for url in "${urls[@]}"; do
  slug=$(basename "$url")
  mdurl -u "$url" -s ".content" -o "./output/${slug}.md"
done
```

### AI Agent Integration
Point your AI agent to [SKILL.md](./SKILL.md) for detailed integration instructions. The tool is designed to work seamlessly with Claude Code and other AI agent CLIs.

## Support

If you're having issues, please let us know via [GitHub Issues](https://github.com/michaelmonetized/url-to-md/issues).

## Sponsoring

If you're interested in sponsoring this project, please feel free to donate:

- [CashApp: $allthosemonies](https://cash.app/$allthosemonies)
- [Chime: $allthatmoney](https://chime.com/allthatmoney)
- [PayPal: @alldatmoney](https://paypal.me/alldatmoney)

## License

[MIT](https://github.com/michaelmonetized/url-to-md/blob/main/LICENSE.md)

This project was created using `bun init` in bun v1.3.1. [Bun](https://bun.com) is a fast all-in-one JavaScript runtime.
