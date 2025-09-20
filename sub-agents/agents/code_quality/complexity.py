"""
US-001-002: Complexity Calculator (MVP)
- Calculates a simple cyclomatic complexity heuristic per function
- Supports .py and .js files
- Outputs per-file and aggregate metrics

Approach (MVP):
- Token-free line scan counting branching keywords as +1:
  if, elif, else if, for, while, case/switch, try/except, catch, and/or, &&/||, ternary '? :'
- Function detection is heuristic:
  Python: lines starting with 'def '
  JS: 'function name(' or arrow functions '(...)=>'

Stdlib only.
"""
from __future__ import annotations
import argparse
import json
import os
import re
from pathlib import Path
from typing import Dict, List

PY_FUNC_RE = re.compile(r"^\s*def\s+\w+\s*\(")
JS_FUNC_RE = re.compile(r"^\s*function\s+\w+\s*\(|=>")

BRANCH_TOKENS = {
    ".py": [" if ", " elif ", " for ", " while ", " except ", " and ", " or ", " try:"],
    ".js": [" if ", " else if ", " for ", " while ", " case ", " catch ", " && ", " || ", " ? "]
}


def detect_function_start(ext: str, line: str) -> bool:
    s = line.lstrip()
    if ext == ".py":
        return s.startswith("def ")
    if ext == ".js":
        return s.startswith("function ") or "=>" in s
    return False


def complexity_of_line(ext: str, line: str) -> int:
    s = f" {line.strip()} "
    tokens = BRANCH_TOKENS.get(ext, [])
    score = 0
    for tok in tokens:
        score += s.count(tok)
    return score


def analyze_file(path: Path) -> Dict:
    ext = path.suffix.lower()
    funcs: List[Dict] = []
    current = None
    line_no = 0
    try:
        with path.open("r", encoding="utf-8", errors="ignore") as f:
            for raw in f:
                line_no += 1
                if detect_function_start(ext, raw):
                    # close previous
                    if current:
                        funcs.append(current)
                    name = "<anonymous>"
                    # naive name extraction
                    s = raw.strip()
                    if ext == ".py" and s.startswith("def "):
                        name = s[4:s.find("(")].strip() or name
                    elif ext == ".js":
                        if s.startswith("function "):
                            tmp = s[len("function "):]
                            name = tmp.split("(")[0].strip() or name
                        elif "=>" in s:
                            name = "<arrow>"
                    current = {"name": name, "start": line_no, "complexity": 1}  # base complexity 1
                # accumulate complexity
                if current:
                    current["complexity"] += complexity_of_line(ext, raw)
        if current:
            funcs.append(current)
    except Exception:
        pass
    total = sum(f.get("complexity", 0) for f in funcs)
    return {"functions": funcs, "total_complexity": total}


def analyze_directory(root: Path) -> Dict:
    results: Dict[str, Dict] = {}
    agg = {"files": 0, "functions": 0, "total_complexity": 0}
    for dirpath, _, filenames in os.walk(root):
        for fn in filenames:
            p = Path(dirpath) / fn
            if p.suffix.lower() not in (".py", ".js"):
                continue
            data = analyze_file(p)
            results[str(p)] = data
            agg["files"] += 1
            agg["functions"] += len(data["functions"])
            agg["total_complexity"] += data["total_complexity"]
    return {"files": results, "aggregate": agg}


def cli() -> None:
    parser = argparse.ArgumentParser(description="Complexity Calculator (MVP)")
    parser.add_argument("path", type=str, help="Path to analyze")
    args = parser.parse_args()
    root = Path(args.path)
    data = analyze_directory(root)
    print(json.dumps(data, indent=2))


if __name__ == "__main__":
    cli()
