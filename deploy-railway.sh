#!/bin/bash
set -e

echo "=== Deploy Railway (Backend + PostgreSQL) ==="

# Instala Railway CLI se necessario
if ! command -v railway &> /dev/null; then
  echo "Instalando Railway CLI..."
  npm install -g @railway/cli
fi

# Login com token
echo "Autenticando..."
export RAILWAY_TOKEN="$1"

if [ -z "$RAILWAY_TOKEN" ]; then
  echo "Erro: informe o token como argumento."
  echo "Uso: ./deploy-railway.sh SEU_TOKEN_AQUI"
  exit 1
fi

# Cria projeto no Railway
echo "Criando projeto no Railway..."
cd "$(dirname "$0")"

railway init --name "lego-set-explore"

# Adiciona PostgreSQL
echo "Adicionando PostgreSQL..."
railway add --plugin postgresql

# Popula o banco
echo "Executando schema e seed no banco..."
railway run --service postgresql psql -f backend/db-init/01-schema.sql
railway run --service postgresql psql -f backend/db-init/02-seed.sql

# Deploy do backend
echo "Fazendo deploy do backend..."
cd backend
railway up --service backend --detach

# Pega a URL do backend
BACKEND_URL=$(railway domain --service backend 2>/dev/null || echo "")

echo ""
echo "=== Deploy do backend concluido! ==="
echo "URL do backend: https://$BACKEND_URL"
echo ""
echo "Guarde essa URL — voce vai precisar dela para o deploy do frontend."
echo "Execute agora: ./deploy-vercel.sh SEU_TOKEN_VERCEL https://$BACKEND_URL/api"
