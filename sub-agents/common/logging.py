from __future__ import annotations
from datetime import datetime

def log(level: str, message: str) -> None:
    ts = datetime.utcnow().isoformat() + "Z"
    print(f"[{ts}] [{level}] {message}")
