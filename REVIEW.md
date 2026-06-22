# FALLOW REVIEW

## HEALTH

## Vital Signs

| Metric | Value |
|:-------|------:|
| Total LOC | 237 |
| Avg Cyclomatic | 3.0 |
| P90 Cyclomatic | 5 |
| Dead Files | 0.0% |
| Dead Exports | 0.0% |
| Maintainability (avg) | 92.8 |
| Circular Deps | 0 |
| Unused Deps | 0 |

## Fallow: 5 high complexity functions

| File | Function | Severity | Cyclomatic | Cognitive | CRAP | Lines |
|:-----|:---------|:---------|:-----------|:----------|:-----|:------|
| `index.ts:23` | `<arrow>` | critical | 11 | 9 | 132.0 **!** | 38 |
| `lib/converter.ts:63` | `replacement` | moderate | 5 | 4 | 30.0 **!** | 8 |
| `lib/converter.ts:75` | `replacement` | moderate | 5 | 3 | 30.0 **!** | 11 |
| `lib/converter.ts:110` | `htmlToMarkdown` | moderate | 5 | 5 | 30.0 **!** | 19 |
| `lib/converter.ts:133` | `urlToMarkdown` | moderate | 5 | 4 | 30.0 **!** | 24 |

**3** files, **15** functions analyzed (thresholds: cyclomatic > 20, cognitive > 15, CRAP >= 30.0)



## AUDIT


Audit scope: 8 changed files vs main (52ee7f8..HEAD)
■ Metrics: dead code 0 · complexity 1 (warn, max cyclomatic: 11) · duplication 0
## Vital Signs

| Metric | Value |
|:-------|------:|
| Total LOC | 80 |
| Avg Cyclomatic | 11.0 |
| P90 Cyclomatic | 11 |
| Dead Files | 0.0% |
| Dead Exports | 0.0% |
| Maintainability (avg) | 92.1 |
| Circular Deps | 0 |
| Unused Deps | 0 |

## Fallow: 1 high complexity function

| File | Function | Severity | Cyclomatic | Cognitive | CRAP | Lines |
|:-----|:---------|:---------|:-----------|:----------|:-----|:------|
| `index.ts:23` | `<arrow>` | critical | 11 | 9 | 132.0 **!** | 38 |

**2** files, **1** functions analyzed (thresholds: cyclomatic > 20, cognitive > 15, CRAP >= 30.0)

✓ No issues in 8 changed files (0.21s)
  audit gate excluded 1 inherited finding (run with --gate all to enforce)


## DEAD

## Fallow: no issues found



## DUPLICATION

## Fallow: no code duplication found



## DOCSTRINGS

### Docstring Coverage

- Status: fail
- Coverage: 57.14%
- Documented symbols: 4/7
- Missing docstrings: 3

