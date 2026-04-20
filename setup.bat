@echo off
chcp 65001 >nul
:: ─────────────────────────────────────────────────────────
::  Maderas del Sur — Setup automático (Windows)
::  Uso: doble clic en setup.bat
:: ─────────────────────────────────────────────────────────

echo.
echo ╔══════════════════════════════════════════╗
echo ║      Maderas del Sur — Setup v3          ║
echo ╚══════════════════════════════════════════╝
echo.

:: ── 1. Comprobar Node.js ─────────────────────────────────
echo ▸ Comprobando Node.js...
where node >nul 2>&1
if %errorlevel% neq 0 (
    echo.
    echo   ✗ Node.js no encontrado.
    echo     Descargalo en: https://nodejs.org/en/download
    echo     Necesitas la version 18.17 o superior.
    echo.
    pause
    exit /b 1
)

for /f "tokens=1 delims=v." %%a in ('node -v') do set NODE_MAJOR=%%a
for /f "tokens=2 delims=v." %%a in ('node -v') do set NODE_MAJOR=%%a
echo   ✓ Node.js detectado

:: ── 2. Comprobar carpeta correcta ────────────────────────
if not exist "package.json" (
    echo.
    echo   ✗ No encuentro package.json.
    echo     Asegurate de ejecutar setup.bat desde dentro
    echo     de la carpeta jarras-v3\
    echo.
    pause
    exit /b 1
)
echo   ✓ Carpeta del proyecto correcta

:: ── 3. Instalar dependencias ──────────────────────────────
echo.
echo ▸ Instalando dependencias (puede tardar 1-2 min)...
call npm install --silent
if %errorlevel% neq 0 (
    echo   ✗ Error al instalar dependencias.
    echo     Comprueba tu conexion a internet e intentalo de nuevo.
    pause
    exit /b 1
)
echo   ✓ Dependencias instaladas

:: ── 4. Abrir el navegador automáticamente ────────────────
echo.
echo ▸ Abriendo http://localhost:3000 en el navegador...
timeout /t 4 /nobreak >nul
start "" "http://localhost:3000"

:: ── 5. Arrancar servidor ─────────────────────────────────
echo.
echo ==========================================
echo   ✓ Todo listo. Arrancando servidor...
echo   → http://localhost:3000
echo   Cierra esta ventana para detener
echo ==========================================
echo.

call npm run dev
pause
