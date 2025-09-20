"""
US-001-001: Basic Code Scanner (MVP)
- Scans .py and .js files recursively under a given directory
- Counts total lines, code lines, comment lines
- Counts number of functions/methods (heuristic)
- Outputs dict results; CLI entry to print JSON

Stdlib only implementation.
"""
from __future__ import annotations
import argparse
import json
import os
from pathlib import Path
from typing import Dict, List

COMMENT_PREFIXES = {
    ".py": "#",
    ".js": "//",
}


def is_code_line(ext: str, line: str) -> bool:
    line_s = line.strip()
    if not line_s:
        return False
    prefix = COMMENT_PREFIXES.get(ext)
    if prefix and line_s.startswith(prefix):
        return False
    # Very naive block comment handling for JS
    if ext == ".js" and (line_s.startswith("/*") or line_s.endswith("*/")):
        return False
    return True


def is_comment_line(ext: str, line: str) -> bool:
    line_s = line.strip()
    if not line_s:
        return False
    prefix = COMMENT_PREFIXES.get(ext)
    if prefix and line_s.startswith(prefix):
        return True
    if ext == ".js" and (line_s.startswith("/*") or line_s.endswith("*/")):
        return True
    return False


def count_functions(ext: str, line: str) -> int:
    s = line.strip()
    if ext == ".py":
        return 1 if s.startswith("def ") else 0
    if ext == ".js":
        # Heuristics: function declarations or arrow functions
        if s.startswith("function "):
            return 1
        if "=>" in s and ("(" in s):
            return 1
    return 0


def scan_file(path: Path) -> Dict[str, int]:
    ext = path.suffix.lower()
    stats = {
        "total_lines": 0,
        "code_lines": 0,
        "comment_lines": 0,
        "functions": 0,
    }
    try:
        with path.open("r", encoding="utf-8", errors="ignore") as f:
            for line in f:
                stats["total_lines"] += 1
                if is_comment_line(ext, line):
                    stats["comment_lines"] += 1
                if is_code_line(ext, line):
                    stats["code_lines"] += 1
                stats["functions"] += count_functions(ext, line)
    except Exception:
        # Ignore unreadable files in MVP
        pass
    return stats


def scan_directory(root: Path) -> Dict:
    results: Dict[str, Dict[str, int]] = {}
    aggregate = {
        "files": 0,
        "total_lines": 0,
        "code_lines": 0,
        "comment_lines": 0,
        "functions": 0,
    }
    for dirpath, _, filenames in os.walk(root):
        for fn in filenames:
            p = Path(dirpath) / fn
            if p.suffix.lower() not in (".py", ".js"):
                continue
            stats = scan_file(p)
            results[str(p)] = stats
            aggregate["files"] += 1
            for k in ("total_lines", "code_lines", "comment_lines", "functions"):
                aggregate[k] += stats[k]
    return {"files": results, "aggregate": aggregate}


def cli() -> None:
    parser = argparse.ArgumentParser(description="Basic Code Scanner (MVP)")
    parser.add_argument("path", type=str, help="Path to scan")
    args = parser.parse_args()
    root = Path(args.path)
    data = scan_directory(root)
    print(json.dumps(data, indent=2))


if __name__ == "__main__":
    cli()
