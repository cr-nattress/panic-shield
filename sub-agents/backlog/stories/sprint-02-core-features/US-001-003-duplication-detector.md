# US-001-003: Duplication Detector

**Epic**: EPIC-001
**Sprint**: 2 (Core)
**Points**: 5
**Priority**: High

## Description
As a developer, I want to find duplicate code blocks so that I can reduce duplication and improve maintainability.

## Acceptance Criteria
- [ ] Detects exact duplicate blocks over N lines (configurable)
- [ ] Reports duplication percentage by file/module
- [ ] JSON and console outputs

## Technical Details
- Add `/agents/code_quality/duplication.py`
- Consider Rabin-Karp or shingling approach for MVP

## Definition of Done
- [ ] Unit tests >80%
- [ ] Docs updated with configuration
- [ ] Results appended to metrics store
