# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

## [1.1.0] - 2026-02-21

### Added
- Programmatic API export via `mod.ts` (#12)
- Extracted core conversion logic to `lib/converter.ts` (#13)
- LICENSE file (MIT) (#6)
- TODO.md (#4)
- PLAN.md (#5)

### Fixed
- Version now sourced from package.json (single source of truth) (#10)
- Cheerio API compatibility — updated deprecated method calls (#14)
- URL validation to reject malformed and unsafe URLs (#14)
- Fetch timeout handling to prevent hung requests (#14)
- HTML table rendering to proper markdown tables (#14)

### Changed
- CLI (`index.ts`) now wraps the core library
- Added User-Agent header to fetch requests to avoid bot blocking (#14)
- Updated cheerio API usage to current stable version (#14)
- Improved error messages for invalid URLs (#14)
