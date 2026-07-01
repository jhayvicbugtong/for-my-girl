@echo off
cd /d "%~dp0"
echo [%date% %time%] Starting send-email >> send-email.log
"C:\Program Files\nodejs\node.exe" send-email.js >> send-email.log 2>&1
echo [%date% %time%] Exit code: %errorlevel% >> send-email.log
exit /b %errorlevel%
