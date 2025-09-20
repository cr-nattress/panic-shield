# US-002-001: Secret Scanner

**Epic**: EPIC-002
**Sprint**: 1 (MVP)
**Points**: 3
**Priority**: Critical

## Description
As a security engineer, I want to scan for secrets (API keys, passwords) so that sensitive data is not committed to the repo.

## Acceptance Criteria
- [ ] Regex-based detection for common secrets
- [ ] Scans all text files recursively
- [ ] Console warnings and JSON output with file+line

## Technical Details
- `/agents/security/secret_scanner.py`
- Provide default regex set + configurable custom patterns

## Definition of Done
- [ ] Unit tests >80%
- [ ] Docs include false-positive handling guidance
