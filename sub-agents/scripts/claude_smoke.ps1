$ErrorActionPreference = "Stop"
$root = Resolve-Path (Join-Path $PSScriptRoot "..")
$venvActivate = Join-Path $root ".venv/Scripts/Activate.ps1"

if (Test-Path $venvActivate) {
  Write-Host "[claude] Activating venv" -ForegroundColor Cyan
  . $venvActivate
}

if (-not $env:ANTHROPIC_API_KEY) {
  Write-Host "[claude] ANTHROPIC_API_KEY not set. Set it with:" -ForegroundColor Yellow
  Write-Host "`n  $env:ANTHROPIC_API_KEY='sk-ant-...'`n" -ForegroundColor Yellow
  exit 1
}

Write-Host "[claude] Running smoke test" -ForegroundColor Cyan
python (Join-Path $root "tools/claude_smoke.py")
