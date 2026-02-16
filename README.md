# LEGO Set Explorer

Full‑Stack‑Webapp zum Suchen, Filtern und Analysieren von LEGO‑Sets. Fokus auf performante Datenbank‑Queries, saubere API‑Struktur und eine moderne, responsive Oberfläche.

---

## Tech‑Stack
- **Frontend:** React, Vite, Tailwind CSS
- **Backend:** Node.js, Express, TypeScript
- **Database:** PostgreSQL
- **Infrastructure:** Docker Compose

---

## Lokale Ausführung (Docker)
```bash
cd lego_projekt
docker compose up -d --build
```

**Ports:**
- Frontend (Docker): `http://localhost:8080`
- Frontend (Vite Dev): `http://localhost:5173`
- Backend API: `http://localhost:3001/api`

---

## Eigene Beiträge (Willian Fonseca)
- **DB Connection Pooling** (`backend/src/db/pool.ts`)
- **Advanced Filtering + Pagination** (`backend/src/modules/sets/sets.routes.ts`)
- **Graceful Shutdown** (`backend/src/server.ts`)

---

© 2026 Willian Fonseca
