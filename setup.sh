#!/bin/bash
# ─────────────────────────────────────────────────────────
#  Maderas del Sur — Setup automático (Mac / Linux)
#  Uso: doble clic en este archivo, o ejecuta ./setup.sh
# ─────────────────────────────────────────────────────────

set -e  # Parar si hay cualquier error

echo ""
echo "╔══════════════════════════════════════════╗"
echo "║      Maderas del Sur — Setup v3          ║"
echo "╚══════════════════════════════════════════╝"
echo ""

# ── 1. Comprobar Node.js ──────────────────────────────────
echo "▸ Comprobando Node.js..."
if ! command -v node &> /dev/null; then
  echo ""
  echo "  ✗ Node.js no encontrado."
  echo "    Descárgalo en: https://nodejs.org/en/download"
  echo "    (versión 18.17 o superior)"
  echo ""
  exit 1
fi

NODE_VER=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VER" -lt 18 ]; then
  echo "  ✗ Necesitas Node.js 18 o superior (tienes $(node -v))"
  echo "    Actualiza en: https://nodejs.org/en/download"
  exit 1
fi
echo "  ✓ Node.js $(node -v) detectado"

# ── 2. Comprobar si estamos en la carpeta correcta ────────
if [ ! -f "package.json" ]; then
  echo ""
  echo "  ✗ No encuentro package.json."
  echo "    Asegúrate de ejecutar este script desde dentro"
  echo "    de la carpeta jarras-v3/"
  echo ""
  exit 1
fi
echo "  ✓ Carpeta del proyecto correcta"

# ── 3. Instalar dependencias ──────────────────────────────
echo ""
echo "▸ Instalando dependencias (puede tardar 1-2 min)..."
npm install --silent
echo "  ✓ Dependencias instaladas"

# ── 4. Abrir en el navegador automáticamente ─────────────
echo ""
echo "▸ Abriendo http://localhost:3000 en el navegador..."

# Esperar 3 segundos para que el servidor arranque
(sleep 3 && open "http://localhost:3000" 2>/dev/null || xdg-open "http://localhost:3000" 2>/dev/null || true) &

# ── 5. Arrancar servidor de desarrollo ───────────────────
echo ""
echo "══════════════════════════════════════════"
echo "  ✓ Todo listo. Arrancando servidor..."
echo "  → http://localhost:3000"
echo "  Pulsa Ctrl+C para detener"
echo "══════════════════════════════════════════"
echo ""

npm run dev
