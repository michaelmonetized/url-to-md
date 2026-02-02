# url-to-md

To install dependencies:

```bash
bun install
```

To run:

```bash
bun run index.ts
```

## Purpose

This is a simple CLI tool that takes a URL and a css selector like "[role='main']" (default) and converts the html to markdown with advanced table support, and media preservation for images, videos, svgs, etc.

## Usage

```bash
url-to-md https://www.example.com
```

or

```bash
url-to-md https://www.example.com "[role='main']"
```

```bash
url-to-md https://www.example.com ".post.type-post.single" readme.md
```

### Args

--url, -u, $1 - The url to convert

--selector, -s, $2 - The css selector to use for the main content (default: "[role='main']")

--output, -o, $3 - The output file (default: "README.md")

--help, -h - Show help

## Contributing

Contributions are welcome! Please open an issue discuss the path to implement the feature or fix with existing contributors, once the issue is assigned you may fork and create a pull request. Fast track your PR by supplying a diff/patch with your fix with your original issue post.

If you're unsure about anything, please ask for clarification.

## Support

If you're having issues, please let us know via discord.

## Sponsoring

If you're interested in sponsoring this project, please feel free to donate:

- [CashApp: $allthosemonies](https://cash.app/$allthosemonies)
- [Chime: $allthatmoney](https://chime.com/allthatmoney)
- [PayPal: @alldatmoney](https://paypal.me/alldatmoney)

## License

[MIT](https://github.com/michaelmonetized/url-to-md/blob/main/LICENSE.md)

This project was created using `bun init` in bun v1.3.1. [Bun](https://bun.com) is a fast all-in-one JavaScript runtime.
