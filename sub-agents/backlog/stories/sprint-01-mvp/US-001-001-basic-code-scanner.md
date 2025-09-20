# US-001-001: Basic Code Scanner

**Epic**: EPIC-001
**Sprint**: 1 (MVP)
**Points**: 3
**Priority**: Critical

## Description
As a developer, I want to scan Python and JavaScript files to count lines and functions so that I can establish a baseline for code quality metrics.

## Acceptance Criteria
- [ ] Scans all .py and .js files in a given directory recursively
- [ ] Counts total lines, code lines, and comment lines
- [ ] Counts number of functions/methods
- [ ] Outputs a JSON report to console and saves to file
- [ ] Handles invalid paths gracefully

## Technical Details
- CLI: `python scanner.py <path>`
- Files: `/agents/code_quality/scanner.py`, `/agents/code_quality/test_scanner.py`, `/agents/code_quality/README.md`
- No external dependencies for MVP

## Definition of Done
- [ ] Code implemented and reviewed
- [ ] Unit tests >80% coverage
- [ ] README documents usage
- [ ] Performance benchmark documented (1000 files < 10s)
