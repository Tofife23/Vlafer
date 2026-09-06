# Start a simple HTTP server using Python 3
# Usage: Open PowerShell in the project folder and run:
#   .\start-server.ps1

$port = 8000
Write-Host "Starting local server at http://localhost:$port/"
if (Get-Command python -ErrorAction SilentlyContinue) {
    python -m http.server $port
} elseif (Get-Command python3 -ErrorAction SilentlyContinue) {
    python3 -m http.server $port
} else {
    Write-Error "Python not found. Install Python 3 or run: npx http-server -p $port"
}