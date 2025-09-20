"""
Minimal orchestrator skeleton (stdlib only).
- Discovers agents by presence of agents/<name>/agent.yaml
- Does NOT parse YAML yet; only lists discovered candidates
- Exits cleanly if no agents are found
"""
from __future__ import annotations
import sys
import json
from pathlib import Path
from datetime import datetime
from typing import Any, Dict

# Optional: YAML config (installed via requirements.txt)
try:  # runtime optional; foundation ran without it before
    import yaml  # type: ignore
except Exception:  # pragma: no cover
    yaml = None  # allows running even if dependency isn't present

# Local common utilities (stdlib only)
BASE_DIR = Path(__file__).parent
AGENTS_DIR = BASE_DIR / "agents"
CONFIG_DIR = BASE_DIR / "config"


def log(level: str, message: str) -> None:
    ts = datetime.utcnow().isoformat() + "Z"
    print(f"[{ts}] [{level}] {message}")


def load_yaml_file(path: Path) -> Dict[str, Any]:
    if not path.exists():
        return {}
    if yaml is None:
        log("WARN", f"PyYAML not available; skipping load for {path}")
        return {}
    try:
        with path.open("r", encoding="utf-8") as f:
            data = yaml.safe_load(f) or {}
        if not isinstance(data, dict):
            log("WARN", f"Ignoring non-mapping YAML in {path}")
            return {}
        return data
    except Exception as e:  # pragma: no cover
        log("ERROR", f"Failed to load YAML {path}: {e}")
        return {}


def merged_config() -> Dict[str, Any]:
    settings = load_yaml_file(CONFIG_DIR / "settings.yaml")
    paths = load_yaml_file(CONFIG_DIR / "paths.yaml")
    # Shallow merge; paths override settings when keys collide
    merged: Dict[str, Any] = {}
    merged.update(settings if isinstance(settings, dict) else {})
    for k, v in (paths if isinstance(paths, dict) else {}).items():
        if k not in merged:
            merged[k] = v
        else:
            # Merge nested dicts shallowly
            if isinstance(merged[k], dict) and isinstance(v, dict):
                merged[k] = {**merged[k], **v}
            else:
                merged[k] = v
    return merged


def discover_agents() -> list[dict]:
    agents = []
    if not AGENTS_DIR.exists():
        return agents
    for agent_dir in AGENTS_DIR.iterdir():
        if not agent_dir.is_dir():
            continue
        meta = agent_dir / "agent.yaml"
        if meta.exists():
            agents.append({
                "name": agent_dir.name,
                "path": str(agent_dir),
                "meta": str(meta)
            })
    return agents


def main(argv: list[str]) -> int:
    log("INFO", "Starting orchestrator (foundation mode)")
    cfg = merged_config()
    log("INFO", "Loaded configuration:")
    try:
        print(json.dumps(cfg, indent=2))
    except Exception:
        print(str(cfg))
    agents = discover_agents()
    log("INFO", f"Discovered {len(agents)} agent(s)")
    if agents:
        log("INFO", json.dumps(agents, indent=2))
        log("INFO", "No agent execution in foundation mode. Exiting.")
    else:
        log("INFO", "No agents found. This is expected during foundation setup.")
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
