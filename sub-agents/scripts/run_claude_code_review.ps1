$ErrorActionPreference = "Stop"
$root = Resolve-Path (Join-Path $PSScriptRoot "..")
$venvActivate = Join-Path $root ".venv/Scripts/Activate.ps1"

if (Test-Path $venvActivate) {
  Write-Host "[claude_code] Activating venv" -ForegroundColor Cyan
  . $venvActivate
}

# Load key from .env if not present in environment
if (-not $env:ANTHROPIC_API_KEY) {
  $dotenv = Join-Path $root ".env"
  if (Test-Path $dotenv) {
    try {
      $lines = Get-Content -LiteralPath $dotenv -Encoding UTF8
      foreach ($raw in $lines) {
        $line = $raw.Trim()
        if (-not $line -or $line.StartsWith('#')) { continue }
        $parts = $line.Split('=', 2)
        if ($parts.Length -eq 2) {
          $k = $parts[0].Trim()
          $v = $parts[1].Trim().Trim('"').Trim("'")
          if ($k -eq 'ANTHROPIC_API_KEY' -and $v) {
            $env:ANTHROPIC_API_KEY = $v
            break
          }
        }
      }
    } catch {
      Write-Host "[claude_code] WARNING: Failed to read .env: $($_.Exception.Message)" -ForegroundColor Yellow
    }
  }
}

if (-not $env:ANTHROPIC_API_KEY) {
  Write-Host "[claude_code] ANTHROPIC_API_KEY not set. Set it with:" -ForegroundColor Yellow
  Write-Host "`n  $env:ANTHROPIC_API_KEY='sk-ant-...'`n" -ForegroundColor Yellow
  exit 1
}

$files = @()
if ($args.Length -gt 0) {
  $files = $args
}

if ($files.Length -eq 0) {
  Write-Host "[claude_code] Using default files: scanner.py, complexity.py" -ForegroundColor Cyan
  python -m agents.claude_code.main
} else {
  Write-Host "[claude_code] Reviewing files: $($files -join ', ')" -ForegroundColor Cyan
  python -m agents.claude_code.main --files $files
}
