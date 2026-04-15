# LEGO Set Explorer

Full‑Stack‑Webapp zum Suchen, Filtern und Analysieren von LEGO‑Sets. Fokus auf performante Datenbank‑Queries, saubere API‑Struktur und eine moderne, responsive Oberfläche.

---

## Vorschau

![LEGO Set Explorer](./frontend/public/Logo1.png)

---

## Tech‑Stack

| Schicht | Technologie |
|---------|-------------|
| Frontend | React 18, Vite, Tailwind CSS |
| Backend | Node.js, Express, TypeScript |
| Datenbank | PostgreSQL 16 |
| Infrastruktur | Docker Compose, Nginx |

---

## Funktionen

- LEGO‑Sets durchsuchen und nach Name filtern
- Filtern nach Thema, Erscheinungsjahr und Teilezahl
- Detailansicht mit vollständiger Teileliste (inkl. Farben und Mengen)
- Benutzerregistrierung & Login (Session‑basierte Authentifizierung)
- Persönliche Sammlung: Sets speichern und verwalten
- Statistik‑Dashboard mit aggregierten Datenbankdaten

---

## Projektstruktur

```
Lego-Set-Explore/
├── backend/               # Node.js/Express REST API
│   ├── src/
│   │   ├── modules/       # Sets, Themes, Stats, Auth, Collections
│   │   ├── middleware/    # Auth, Error Handling
│   │   └── db/            # PostgreSQL Connection Pooling
│   └── db-init/           # Schema SQL + Seed-Daten
├── frontend/              # React + Vite SPA
│   └── src/
│       ├── pages/
│       ├── components/
│       └── context/
└── docker-compose.yml
```

---

## Lokale Ausführung

### Mit Docker (empfohlen)

```bash
# .env Datei anlegen
cp .env.example .env

# Container bauen und starten
docker compose up -d --build
```

### Ohne Docker

**Voraussetzungen:** Node.js 18+, PostgreSQL 16

```bash
# 1. Datenbank einrichten
psql -U postgres -c "CREATE USER lego_user WITH PASSWORD 'ihr_passwort';"
psql -U postgres -c "CREATE DATABASE lego_explorer OWNER lego_user;"
psql -U lego_user -d lego_explorer -f backend/db-init/01-schema.sql
psql -U lego_user -d lego_explorer -f backend/db-init/02-seed.sql

# 2. Backend starten
cd backend
cp .env.example .env   # Variablen anpassen
npm ci && npm run build && npm start

# 3. Frontend starten (neues Terminal)
cd frontend
npm ci && npm run dev
```

**Ports:**

| Dienst | URL |
|--------|-----|
| Frontend (Vite Dev) | `http://localhost:5173` |
| Frontend (Docker/Nginx) | `http://localhost:8080` |
| Backend API | `http://localhost:3000/api` |

---

## Umgebungsvariablen

Alle benötigten Variablen sind in `.env.example` dokumentiert. Vor dem Start bitte kopieren und anpassen:

```bash
cp .env.example .env
```

---

## Meine Beiträge (Willian Fonseca)

- **DB Connection Pooling** — `backend/src/db/pool.ts`
- **Advanced Filtering & Pagination** — `backend/src/modules/sets/sets.routes.ts`
- **Graceful Shutdown** — `backend/src/server.ts`

---

## API‑Endpunkte

| Methode | Endpunkt | Beschreibung |
|---------|----------|--------------|
| GET | `/api/sets` | Sets mit Filtern und Paginierung |
| GET | `/api/sets/:setNum` | Set‑Details mit Teileliste |
| GET | `/api/themes` | Alle Themen |
| GET | `/api/stats/overview` | Statistik‑Übersicht |
| POST | `/api/auth/register` | Benutzer registrieren |
| POST | `/api/auth/login` | Einloggen |
| GET/POST/DELETE | `/api/collections` | Sammlung verwalten |

---

© 2026 Willian Fonseca
