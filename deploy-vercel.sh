#!/bin/bash
set -e

echo "=== Deploy Vercel (Frontend) ==="

VERCEL_TOKEN="$1"
BACKEND_API_URL="$2"

if [ -z "$VERCEL_TOKEN" ] || [ -z "$BACKEND_API_URL" ]; then
  echo "Erro: argumentos faltando."
  echo "Uso: ./deploy-vercel.sh SEU_TOKEN_VERCEL https://seu-backend.railway.app/api"
  exit 1
fi

# Instala Vercel CLI se necessario
if ! command -v vercel &> /dev/null; then
  echo "Instalando Vercel CLI..."
  npm install -g vercel
fi

cd "$(dirname "$0")/frontend"

echo "Fazendo deploy do frontend..."
vercel deploy --prod \
  --token "$VERCEL_TOKEN" \
  --yes \
  --env VITE_API_URL="$BACKEND_API_URL" \
  --build-env VITE_API_URL="$BACKEND_API_URL"

echo ""
echo "=== Deploy do frontend concluido! ==="
echo "Acesse a URL acima para ver seu projeto no ar."
