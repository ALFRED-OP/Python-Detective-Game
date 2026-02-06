@echo off
setlocal
echo ===================================================
echo   Python Detective Game - Installation Wizard
echo ===================================================

echo.
echo [1/3] Installing Frontend Dependencies...
cd client
call npm install
if %errorlevel% neq 0 (
    echo.
    echo ERROR: Failed to install frontend dependencies.
    pause
    exit /b %errorlevel%
)
cd ..

echo.
echo [2/3] Installing Backend Helper Dependencies...
cd api
if exist package.json (
    call npm install
)
cd ..

echo.
echo [3/3] Finalizing Setup...
echo.
echo INSTALLATION COMPLETE!
echo.
echo Next Steps:
echo 1. Ensure XAMPP (MySQL) is running and database 'python_detective' is created.
echo 2. Import 'sql/schema.sql' into your database.
echo 3. Run 'RUN_BACKEND.bat' to start the API server.
echo 4. Run 'RUN_FRONTEND.bat' to start the UI.
echo.
pause
