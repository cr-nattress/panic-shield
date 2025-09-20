$ErrorActionPreference = "Stop"
$root = Resolve-Path (Join-Path $PSScriptRoot "..")
$venvActivate = Join-Path $root ".venv/Scripts/Activate.ps1"

if (Test-Path $venvActivate) {
  Write-Host "[run] Activating venv" -ForegroundColor Cyan
  . $venvActivate
} else {
  Write-Host "[run] WARNING: venv not found. Running with system Python." -ForegroundColor Yellow
}

Write-Host "[run] Executing orchestrator" -ForegroundColor Cyan
python (Join-Path $root "orchestrator.py")
