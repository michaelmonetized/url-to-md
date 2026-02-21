# PLAN

## Vision
A fast, reliable CLI and library for converting web pages to clean markdown with full media preservation.

## Architecture
1. **Core library** (`lib/converter.ts`) — Pure conversion logic, no CLI dependencies
2. **CLI entry** (`index.ts`) — Commander-based CLI that wraps the core library
3. **API export** (`mod.ts`) — Programmatic API for use as a library

## Milestones
- [x] v1.0 — CLI with basic conversion, table/media support
- [ ] v1.1 — Extract core into library, add programmatic API, fix version sourcing
- [ ] v1.2 — Custom rule configs, batch processing, stdin support
- [ ] v2.0 — Plugin system for custom converters
