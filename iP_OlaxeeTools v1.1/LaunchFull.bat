@echo off
REM Vérifie si Python est installé
python --version >nul 2>&1
IF ERRORLEVEL 1 (
    echo Python n'est pas installé ou n'est pas dans le PATH.
    pause
    exit /b 1
)

REM Lance le serveur Python en tâche de fond
start "" python server.py

REM Pause pour laisser le serveur démarrer
timeout /t 2 /nobreak >nul

REM Ouvre la page dans le navigateur
start "" "http://localhost:8000"
