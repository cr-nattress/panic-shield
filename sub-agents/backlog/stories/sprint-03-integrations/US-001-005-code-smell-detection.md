# US-001-005: Code Smell Detection

**Epic**: EPIC-001
**Sprint**: 3 (Integration)
**Points**: 5
**Priority**: High

## Description
As a developer, I want to detect common code smells (long methods, large classes, dead code) so that I can target high-value refactors.

## Acceptance Criteria
- [ ] Detects long methods and large classes by thresholds
- [ ] Basic dead code detection pass
- [ ] JSON and console outputs

## Technical Details
- Add `/agents/code_quality/smells.py`
- Thresholds configurable

## Definition of Done
- [ ] Unit tests >80%
- [ ] Docs updated
- [ ] Integrated into metrics store
