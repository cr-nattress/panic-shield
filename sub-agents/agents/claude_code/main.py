"""
Claude Code Review Sub-Agent
- Reads target local files (default: code_quality scanner/complexity)
- Sends them to Claude with a structured review prompt
- Writes a Markdown report under data/reports/claude_code/

Usage (as module):
    python -m agents.claude_code.main --files agents/code_quality/scanner.py agents/code_quality/complexity.py

Requires env var: ANTHROPIC_API_KEY
"""
from __future__ import annotations
import argparse
from datetime import datetime
from pathlib import Path
from typing import List

from common.llm_claude import ask_claude

DEFAULT_FILES = [
    Path("agents/code_quality/scanner.py"),
    Path("agents/code_quality/complexity.py"),
]

REPORT_DIR = Path("data/reports/claude_code")

REVIEW_PROMPT_TEMPLATE = (
    "You are a senior static analysis engineer. Review the following repository files. "
    "Focus on correctness, edge cases, complexity heuristic soundness, performance for ~1k files, and test coverage hints.\n\n"
    "For each file:\n"
    "- Summarize what the code does\n"
    "- Identify correctness issues or logical bugs\n"
    "- List edge cases the code may miss\n"
    "- Suggest concrete improvements (bullet list)\n"
    "- Provide 2-3 targeted unit tests per risky area\n\n"
    "Then give an overall readiness verdict for MVP (Yes/No) with a short rationale.\n\n"
    "FILES:\n\n{files_block}"
)


def build_files_block(paths: List[Path]) -> str:
    parts = []
    for p in paths:
        try:
            text = p.read_text(encoding="utf-8")
        except Exception as e:
            text = f"<ERROR reading {p}: {e}>"
        parts.append(f"--- FILE: {p.as_posix()} ---\n```python\n{text}\n```\n")
    return "\n".join(parts)


def run(files: List[Path]) -> Path:
    REPORT_DIR.mkdir(parents=True, exist_ok=True)
    files_block = build_files_block(files)
    prompt = REVIEW_PROMPT_TEMPLATE.format(files_block=files_block)
    response = ask_claude(prompt, max_tokens=2000)
    ts = datetime.utcnow().strftime("%Y%m%dT%H%M%SZ")
    out = REPORT_DIR / f"review_{ts}.md"
    out.write_text(response, encoding="utf-8")
    return out


def main() -> int:
    ap = argparse.ArgumentParser(description="Claude Code Review Sub-Agent")
    ap.add_argument("--files", nargs="*", default=None, help="Files to review relative to repository root")
    args = ap.parse_args()
    if args.files:
        paths = [Path(f) for f in args.files]
    else:
        paths = DEFAULT_FILES
    out = run(paths)
    print(f"[claude_code] Wrote review report: {out}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
