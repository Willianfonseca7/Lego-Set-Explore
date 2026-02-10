# LEGO_PROJEKT

Monorepo com frontend (React + Vite) e backend (Node.js + Express + TypeScript).

## Estrutura

```
LEGO_PROJEKT/
├─ backend/
├─ frontend/
├─ docker-compose.yml
├─ package.json
└─ README.md
```

## Requisitos

- Node.js 18+
- npm

## Comandos (raiz)

Frontend:
- `npm run dev:frontend`
- `npm run build:frontend`
- `npm run lint:frontend`

Backend:
- `npm run dev:backend`
- `npm run build:backend`
- `npm run lint:backend`

## Comandos (diretamente nas pastas)

Frontend:
- `cd frontend`
- `npm run dev`
- `npm run build`
- `npm run lint`
- `npm run preview`

Backend:
- `cd backend`
- `npm run dev`
- `npm run build`
- `npm run start`
- `npm run lint`

## Docker

Build e run:
- `docker compose up --build`

Portas padrão:
- Frontend: `http://localhost:8080`
- Backend: `http://localhost:3000`
