# EPIC-000: Sub-Agents Foundation Setup

## Overview
Establish the file/folder organization, configuration, scripts, and minimal orchestration needed to build, test, and run the first agent later. No agent implementations will be created in this epic.

## Success Criteria
- [ ] Directory structure created under `sub-agents/`
- [ ] Bootstrap and run scripts (PowerShell) available for Windows
- [ ] Python standard-library-only orchestrator skeleton created (no agent logic)
- [ ] Common utilities and config placeholders added
- [ ] README with setup and usage instructions
- [ ] Smoke test passes (no agents found, graceful exit)

## User Stories
1. US-000-001: Create Directory Structure and Gitkeep Files
2. US-000-002: Add Configuration Placeholders (YAML)
3. US-000-003: Add Common Utilities (logging, io, types)
4. US-000-004: Implement Orchestrator Skeleton (no agents)
5. US-000-005: Add Windows Run Scripts (bootstrap, run_orchestrator, run_agent)
6. US-000-006: Write Sub-Agents README and Contribution Guide
7. US-000-007: Add Smoke Test (pytest-free, stdlib-only)

## Tasks
- [ ] Create folders: `agents/`, `common/`, `config/`, `scripts/`, `data/{metrics,reports}/`, `tests/`, `tools/`, `backlog/generated/`
- [ ] Add `.gitkeep` placeholders to empty dirs
- [ ] Create `config/settings.yaml` and `config/paths.yaml`
- [ ] Create `common/logging.py`, `common/io.py`, `common/types.py`
- [ ] Create `orchestrator.py` with discovery stub and graceful messaging
- [ ] Create PowerShell scripts: `bootstrap_env.ps1`, `run_orchestrator.ps1`, `run_agent.ps1`
- [ ] Create `README.md` with environment setup and usage
- [ ] Create `tests/test_smoke.py` with stdlib `unittest`

## Definition of Done
- [ ] All files present and documented
- [ ] Orchestrator runs without agents and exits cleanly
- [ ] Scripts work on Windows PowerShell
- [ ] Lays groundwork for EPIC-001 and beyond without external dependencies
