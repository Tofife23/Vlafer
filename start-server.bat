@echo off
REM Start a simple HTTP server using Python 3 on Windows
set PORT=8000
where python >nul 2>nul
if %ERRORLEVEL%==0 (
    python -m http.server %PORT%
) else (
    where python3 >nul 2>nul
    if %ERRORLEVEL%==0 (
        python3 -m http.server %PORT%
    ) else (
        echo Python not found. Install Python 3 or run a Node server (npx http-server -p %PORT%)
    )
)
pause