# US-001-002: Complexity Calculator

**Epic**: EPIC-001
**Sprint**: 1 (MVP)
**Points**: 3
**Priority**: High

## Description
As a developer, I want to calculate cyclomatic complexity so that I can flag complex functions.

## Acceptance Criteria
- [ ] Computes cyclomatic complexity per function
- [ ] Flags functions exceeding threshold (10)
- [ ] Console output and JSON export

## Technical Details
- Extend `/agents/code_quality/scanner.py`
- Add `/agents/code_quality/complexity.py`
- Threshold configurable via CLI arg: `--complexity-threshold`

## Definition of Done
- [ ] Unit tests >80%
- [ ] Documentation updated
- [ ] Results included in metrics file
