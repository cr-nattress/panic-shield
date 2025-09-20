# Sub-Agents Workspace

This workspace contains the foundational structure and tooling to build AI-enhanced software-engineering sub-agents. This EPIC sets up file/folder org, config, scripts, and a minimal orchestrator (no agent implementations yet).

## Structure
- `agents/` — each agent lives in its own folder later (no agents yet)
- `common/` — shared utilities (logging, io helpers, basic types)
- `config/` — YAML configuration and paths
- `data/metrics/` — metrics output location
- `data/reports/` — generated reports
- `scripts/` — PowerShell scripts to bootstrap and run
- `tests/` — smoke tests (stdlib `unittest`)
- `tools/` — helper scripts (reserved)
- `backlog/generated/` — auto-generated backlog items from agents
- `orchestrator.py` — minimal orchestrator entrypoint

## Prerequisites
- Windows PowerShell
- Python 3.10+ available as `py -3` or `python`

## Quickstart (Windows PowerShell)
1) Bootstrap the environment (creates `.venv/` and installs `requirements.txt`):
```
./scripts/bootstrap_env.ps1
```

2) (Optional) Activate the virtual environment in your current shell:
```
. ./.venv/Scripts/Activate.ps1
```

3) Run the orchestrator (will gracefully report no agents found):
```
./scripts/run_orchestrator.ps1
```

Expected output: a log message that zero agents were discovered and exit code 0.

4) Run smoke tests (optional):
```
python -m unittest discover -s tests -p "test_*.py"
```

## Adding Your First Agent (Later)
- Create a folder under `agents/<agent_name>/`
- Include a minimal `agent.yaml` with metadata and an executable module exposing `run(args)`
- The orchestrator will discover agents by presence of `agent.yaml`

Refer to `backlog/epics/EPIC-000-foundation-setup.md` for detailed tasks.
