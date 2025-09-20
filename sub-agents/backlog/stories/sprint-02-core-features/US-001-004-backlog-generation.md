# US-001-004: Backlog Generation

**Epic**: EPIC-001
**Sprint**: 2 (Core)
**Points**: 3
**Priority**: Medium

## Description
As a developer, I want the agent to create markdown backlog items for detected issues so that remediation work is clearly tracked.

## Acceptance Criteria
- [ ] Generates Markdown tasks per finding with severity and suggested fix
- [ ] Groups tasks by category
- [ ] Writes to `backlog/generated/` with stable IDs

## Technical Details
- Add `/agents/code_quality/backlog_writer.py`
- ID format: `CQ-<timestamp>-<hash>`

## Definition of Done
- [ ] Unit tests >80%
- [ ] Docs: backlog format and examples
