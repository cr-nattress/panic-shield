from __future__ import annotations
from pathlib import Path

def ensure_dir(p: Path | str) -> Path:
    path = Path(p)
    path.mkdir(parents=True, exist_ok=True)
    return path
