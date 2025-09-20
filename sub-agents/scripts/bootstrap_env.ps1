param(
  [string]$PythonExe = "py"
)

Write-Host "[bootstrap] Creating venv at .venv (if missing)" -ForegroundColor Cyan
$venvPath = Join-Path $PSScriptRoot "..\.venv"

# Create venv
& $PythonExe -3 -m venv $venvPath
if ($LASTEXITCODE -ne 0) {
  Write-Host "[bootstrap] Falling back to 'python'" -ForegroundColor Yellow
  & python -m venv $venvPath
}

$venvPython = Join-Path $venvPath "Scripts/python.exe"
if (!(Test-Path $venvPython)) {
  throw "[bootstrap] venv python not found at $venvPython"
}

Write-Host "[bootstrap] Installing dependencies from requirements.txt" -ForegroundColor Cyan
$repoRoot = Resolve-Path (Join-Path $PSScriptRoot "..")
$requirements = Join-Path $repoRoot "requirements.txt"
if (Test-Path $requirements) {
  & $venvPython -m pip install --upgrade pip
  & $venvPython -m pip install -r $requirements
} else {
  Write-Host "[bootstrap] requirements.txt not found; skipping installs" -ForegroundColor Yellow
}

Write-Host "[bootstrap] Environment ready." -ForegroundColor Green
Write-Host "[bootstrap] To activate: `n`n  .\\.venv\\Scripts\\Activate.ps1`n" -ForegroundColor Green
Write-Host "[bootstrap] No packages installed (stdlib only). You can install later as needed." -ForegroundColor Green
