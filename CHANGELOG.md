# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

## [Unreleased]

### Fixed
- Cheerio API compatibility — updated deprecated method calls (#14)
- URL validation to reject malformed and unsafe URLs (#14)
- Fetch timeout handling to prevent hung requests (#14)
- HTML table rendering to proper markdown tables (#14)

### Changed
- Added User-Agent header to fetch requests to avoid bot blocking (#14)
- Updated cheerio API usage to current stable version (#14)
- Improved error messages for invalid URLs (#14)
