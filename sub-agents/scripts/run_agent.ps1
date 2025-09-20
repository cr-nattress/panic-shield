param(
  [Parameter(Mandatory=$true)][string]$Name,
  [string]$Args
)
$ErrorActionPreference = "Stop"
$root = Resolve-Path (Join-Path $PSScriptRoot "..")
$venvActivate = Join-Path $root ".venv/Scripts/Activate.ps1"

if (Test-Path $venvActivate) {
  Write-Host "[run-agent] Activating venv" -ForegroundColor Cyan
  . $venvActivate
}

$agentPath = Join-Path $root (Join-Path "agents" $Name)
if (!(Test-Path $agentPath)) { throw "Agent '$Name' not found at $agentPath" }
Write-Host "[run-agent] Foundation mode: no agent implementation yet. Exiting." -ForegroundColor Yellow
