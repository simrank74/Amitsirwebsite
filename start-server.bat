@echo off
setlocal

REM Always serve THIS folder (even if the current working directory is different)
set "PORT=5173"
set "ROOT=%~dp0"

REM Open the site in your default browser
start "" "http://127.0.0.1:%PORT%/"

REM Start the server (IPv4 only, and locked to this folder)
python -m http.server %PORT% --bind 127.0.0.1 --directory "%ROOT%"



