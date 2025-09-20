# US-001-006: Metrics Storage

**Epic**: EPIC-001
**Sprint**: 3 (Integration)
**Points**: 3
**Priority**: Medium

## Description
As an engineer, I want to persist metrics to files so that trends can be tracked over time.

## Acceptance Criteria
- [ ] Append metrics to JSON store
- [ ] Daily snapshotting
- [ ] Trend calculation scripts

## Technical Details
- `/agents/code_quality/metrics_store.py`
- Store under `/data/metrics/code_quality/`

## Definition of Done
- [ ] Tests >80%
- [ ] Docs for file formats
