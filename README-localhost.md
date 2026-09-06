Localhost — how to run the site locally

Options:

1) Python 3 (recommended, no install beyond Python):

Open a terminal (PowerShell) in the project folder (where `index.html` is) and run:

```powershell
python -m http.server 8000
```

Then open http://localhost:8000 in your browser.

If `python` is not present, try `python3 -m http.server 8000`.

You can also use the included convenience scripts:

- PowerShell: `.\\tstart-server.ps1` (or `.\start-server.ps1`)
- Batch: `start-server.bat`

2) Node (if you have Node.js installed):

```powershell
npx http-server -p 8000
```

Notes:
- The server serves static files from the directory you run it in. Make sure you `cd` into the project root (`c:\Tom\Programovani\HTML\18. Vlafer`).
- If you need a different port, change `8000` in commands or scripts.
