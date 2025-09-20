"""
Claude client wrapper for Windows dev environment.
- Uses environment variable ANTHROPIC_API_KEY
- Provides a simple "ask_claude" helper for minimal prompts
- Keeps dependencies minimal (anthropic SDK only)
"""
from __future__ import annotations
import os
from typing import Optional
from pathlib import Path

try:
    from anthropic import Anthropic
except Exception as e:  # pragma: no cover
    raise RuntimeError(
        "Anthropic SDK not installed. Run ./scripts/bootstrap_env.ps1 to install requirements.txt"
    ) from e


def _load_key_from_dotenv() -> Optional[str]:
    """Attempt to load ANTHROPIC_API_KEY from a local .env file.
    The .env file should live at the sub-agents repository root and should NOT be committed.
    Only loads if the environment variable is not already set.
    """
    if os.getenv("ANTHROPIC_API_KEY"):
        return None
    # sub-agents root is two levels up from this file: common/llm_claude.py
    base_dir = Path(__file__).resolve().parents[1]
    dotenv = base_dir / ".env"
    if not dotenv.exists():
        return None
    try:
        for raw in dotenv.read_text(encoding="utf-8", errors="ignore").splitlines():
            line = raw.strip()
            if not line or line.startswith("#"):
                continue
            if "=" not in line:
                continue
            k, v = line.split("=", 1)
            k = k.strip()
            v = v.strip().strip('"').strip("'")
            if k == "ANTHROPIC_API_KEY" and v:
                os.environ.setdefault("ANTHROPIC_API_KEY", v)
                return v
    except Exception:
        # Silent fallback; calling code will still raise if key missing
        return None
    return None


def get_client() -> Anthropic:
    # Try environment first, then optional .env fallback
    api_key = os.getenv("ANTHROPIC_API_KEY") or _load_key_from_dotenv()
    if not api_key:
        raise EnvironmentError(
            "Missing ANTHROPIC_API_KEY. In PowerShell, set it with: $env:ANTHROPIC_API_KEY='sk-ant-...'"
        )
    return Anthropic(api_key=api_key)


def ask_claude(prompt: str, model: str = "claude-3-5-sonnet-latest", max_tokens: int = 256) -> str:
    client = get_client()
    message = client.messages.create(
        model=model,
        max_tokens=max_tokens,
        messages=[{"role": "user", "content": prompt}],
    )
    # message.content is a list of content blocks; join text blocks
    parts = []
    for block in getattr(message, "content", []) or []:
        text = getattr(block, "text", None)
        if text:
            parts.append(text)
    return "\n".join(parts) or str(message)
