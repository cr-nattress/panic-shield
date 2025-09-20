"""
Quick Claude smoke test.
- Requires ANTHROPIC_API_KEY in environment
- Uses common.llm_claude.ask_claude()
- Prints the first ~ few lines of the response
"""
from __future__ import annotations
import sys

from common.llm_claude import ask_claude


def main() -> int:
    prompt = "Say 'hello from Claude' and the current UTC date in ISO format."
    try:
        resp = ask_claude(prompt, max_tokens=64)
    except Exception as e:
        print(f"[ERROR] {e}")
        return 1
    print("--- Claude response ---")
    print(resp)
    print("-----------------------")
    return 0


if __name__ == "__main__":
    sys.exit(main())
