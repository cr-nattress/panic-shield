# US-002-004: Security Backlog Items

**Epic**: EPIC-002
**Sprint**: 2 (Core)
**Points**: 3
**Priority**: High

## Description
As a security engineer, I want to automatically generate HIGH-priority backlog tasks for vulnerabilities so that remediation is tracked and prioritized.

## Acceptance Criteria
- [ ] Creates markdown tasks per vulnerability with severity, CVE/ID, and remediation steps
- [ ] Groups by severity and component
- [ ] Stable IDs and links back to source finding

## Technical Details
- `/agents/security/backlog_writer.py`
- ID format: `SEC-<timestamp>-<hash>`
- Writes to `backlog/generated/security/`

## Definition of Done
- [ ] Unit tests >80%
- [ ] Docs include templates and examples
