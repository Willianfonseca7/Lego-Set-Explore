# 🧱 LEGO Set Explorer# 🧱 LEGO Set Explorer



[![Built with Docker](https://img.shields.io/badge/Built%20with-Docker-2496ED?logo=docker&logoColor=white)](https://www.docker.com/)Eine Community-Plattform für LEGO-Fans zum Durchsuchen, Vergleichen und Analysieren von LEGO-Sets und Themen.

[![PostgreSQL](https://img.shields.io/badge/Database-PostgreSQL-336791?logo=postgresql&logoColor=white)](https://www.postgresql.org/)

[![Express](https://img.shields.io/badge/Backend-Express-000000?logo=express&logoColor=white)](https://expressjs.com/)## 📋 Projektbeschreibung

[![React](https://img.shields.io/badge/Frontend-React-61DAFB?logo=react&logoColor=black)](https://reactjs.org/)

**LEGO Set Explorer** (auch bekannt als BrickWorld Community) ist eine Webanwendung, die es Mitgliedern ermöglicht, eine große Datenbank von LEGO-Sets und Themen zu durchsuchen und zu analysieren. Das Projekt demonstriert performante Backend-Implementierung mit effizienten Queries, Pagination und Indizes für große Datenmengen.

A modern, performant community platform for LEGO enthusiasts to explore, search, and analyze LEGO sets, themes, and parts.

### Hauptmerkmale

## 🎯 Project Overview

- 🔍 **Erweiterte Such- und Filterfunktionen**: Nach Namen, Thema, Jahr, Teileanzahl filtern

**LEGO Set Explorer** (BrickWorld Community) is a full-stack web application demonstrating efficient database queries, pagination, and indexing for large datasets. Built with Express.js, PostgreSQL, and React.- 📊 **Statistiken und Analysen**: Sets nach Jahr, Thema, Teileverteilung

- 📦 **Detaillierte Set-Ansichten**: Vollständige Teilelisten mit Farben und Mengen

### Key Features- 🎨 **Responsive Design**: Optimiert für Desktop und Mobile

- ⚡ **Performance-optimiert**: Indizierte Datenbankabfragen, Pagination

- 🔍 **Advanced Search & Filtering** - Search by name, theme, year, and parts count- 🗄️ **Strukturierte Datenbank**: PostgreSQL mit normalisierten Tabellen

- 📊 **Statistics Dashboard** - Sets by year, theme distribution, and more

- 📦 **Detailed Set Views** - Complete parts lists with colors and quantities### Beispieldaten

- 🎨 **Responsive Design** - Optimized for desktop and mobile

- ⚡ **Performance Optimized** - Indexed database queries with pagination- **8 Tabellen** mit Relationen

- 🗄️ **Structured Database** - PostgreSQL with normalized tables- **633.250+ Einträge** in der Datenbank (simuliert)

- **30 LEGO Sets** als Beispieldaten

### Sample Data- **18 Themen** mit Hierarchie

- **20 verschiedene Teiletypen**

- **30 LEGO Sets** from various years (2016-2023)- **23 Farben** für Teile

- **18 Themes** with hierarchical structure

- **20 Different Parts** types## 🏗️ Technologie-Stack

- **23 Colors** for parts

- **Full Inventories** with complete parts lists### Backend

- **Node.js** mit **Express.js**

---- **TypeScript** für Type Safety

- **PostgreSQL** Datenbank

## 🚀 Quick Start- **pg** (node-postgres) für Datenbankverbindung

- Effiziente Queries mit Indizes und Pagination

### Prerequisites

### Frontend

- Docker & Docker Compose- **React** mit **Vite**

- Ports 3000, 5432, and 8080 available- **Tailwind CSS** für Styling

- **React Router** für Navigation

### Start the Application- REST API Integration



```bash### DevOps

cd /path/to/lego_projekt- **Docker** & **Docker Compose**

docker-compose up -d --build- Multi-Container Setup (Frontend, Backend, Database)

```- Hot-Reload Development Environment



Wait 30 seconds, then access:## 🚀 Installation und Start



- **Application**: http://localhost:8080### Voraussetzungen

- **Backend API**: http://localhost:3000/api/sets

- **Health Check**: http://localhost:3000/health- Node.js 18+ und npm

- Docker und Docker Compose

### Test the API- Git



```bash### 1. Repository klonen

# Health checks

curl http://localhost:3000/health```bash

curl http://localhost:3000/health/dbgit clone <repository-url>

cd lego_projekt

# Get all sets```

curl http://localhost:3000/api/sets

### 2. Backend Setup

# Search for sets

curl "http://localhost:3000/api/sets?search=star&limit=5"```bash

cd backend

# Get set details with partsnpm install

curl http://localhost:3000/api/sets/75341-1cp .env.example .env

```

# Get statistics

curl http://localhost:3000/api/stats/overview### 3. Frontend Setup

```

```bash

---cd ../frontend

npm install

## 📁 Project Structure```



```### 4. Mit Docker starten (Empfohlen)

lego_projekt/

├── backend/```bash

│   ├── db-init/              # Database schema and seed data# Im Hauptverzeichnis

│   │   ├── 01-schema.sql     # Table definitions and indexesdocker-compose up --build

│   │   └── 02-seed.sql       # Sample LEGO data```

│   ├── src/

│   │   ├── config/           # ConfigurationDie Anwendung ist dann verfügbar unter:

│   │   ├── db/               # Database connection- **Frontend**: http://localhost:8080

│   │   ├── routes/           # API routes- **Backend API**: http://localhost:3000

│   │   ├── lib/              # Utilities- **LEGO Explorer Page**: http://localhost:8080/lego-explorer

│   │   └── server.ts         # Express application

│   ├── Dockerfile### 5. Ohne Docker (Development)

│   └── package.json

│Terminal 1 - Datenbank:

├── frontend/```bash

│   ├── src/docker run --name lego-postgres -e POSTGRES_USER=lego_user -e POSTGRES_PASSWORD=lego_password -e POSTGRES_DB=lego_explorer -p 5432:5432 -d postgres:16-alpine

│   │   ├── pages/```

│   │   │   └── LegoExplorer.jsx  # Main application

│   │   ├── App.jsxTerminal 2 - Backend:

│   │   └── main.jsx```bash

│   ├── Dockerfilecd backend

│   └── package.jsonnpm run dev

│```

├── docker-compose.yml

└── README.mdTerminal 3 - Frontend:

``````bash

cd frontend

---npm run dev

```

## 🏗️ Technology Stack

## 📡 API-Endpunkte

### Backend

- **Node.js 18+** with **Express.js**### Sets

- **TypeScript** - Type safety

- **PostgreSQL 16** - Relational database```

- **Docker** - ContainerizationGET /api/sets

```

### FrontendParameter: `page`, `limit`, `search`, `theme_id`, `year_from`, `year_to`, `min_parts`, `max_parts`, `sort_by`, `sort_order`

- **React 18** - UI library

- **Vite** - Build tool**Beispiel:**

- **Tailwind CSS** - Styling```bash

- **React Router** - Routingcurl "http://localhost:3000/api/sets?search=star&year_from=2020&limit=10"

```

---

```

## 📡 API EndpointsGET /api/sets/:setNum

```

### SetsGibt ein spezifisches Set mit allen Teilen zurück.

- `GET /api/sets` - Get all sets with filters and pagination

- `GET /api/sets/:setNum` - Get set details with parts list**Beispiel:**

```bash

### Themescurl "http://localhost:3000/api/sets/75341-1"

- `GET /api/themes` - Get all themes```

- `GET /api/themes/:id` - Get theme details

### Themes

### Statistics

- `GET /api/stats/overview` - General statistics```

- `GET /api/stats/sets-by-year` - Sets by yearGET /api/themes

- `GET /api/stats/sets-by-theme` - Sets by theme```

- `GET /api/stats/parts-distribution` - Parts distributionGibt alle Themen mit Set-Anzahl zurück.



See [PROJEKTDOKUMENTATION.md](./PROJEKTDOKUMENTATION.md) for detailed API documentation.```

GET /api/themes/:id

---```

Gibt ein spezifisches Thema mit allen Sets zurück.

## 🗄️ Database Schema

### Statistiken

- **sets** - LEGO set information

- **themes** - Themes with hierarchy```

- **parts** - Available partsGET /api/stats/sets-by-year

- **colors** - Color options```

- **inventories** - Set versionsSets gruppiert nach Jahr.

- **inventory_parts** - Parts in sets

```

**Performance Indexes:**GET /api/stats/sets-by-theme

```sql```

CREATE INDEX idx_sets_year ON sets(year);Sets gruppiert nach Thema.

CREATE INDEX idx_sets_theme_id ON sets(theme_id);

CREATE INDEX idx_sets_name ON sets USING gin(to_tsvector('english', name));```

```GET /api/stats/overview

```

---Allgemeine Übersichtsstatistiken.



## 🔧 Development```

GET /api/stats/parts-distribution

### Local Development```

Verteilung der Sets nach Teileanzahl.

**Backend:**

```bash## 🗄️ Datenbankschema

cd backend

npm install### Haupttabellen

npm run dev  # Runs on port 3000

```- **sets**: LEGO Set-Informationen

- **themes**: Themen mit Hierarchie

**Frontend:**- **parts**: Verfügbare LEGO-Teile

```bash- **colors**: Verfügbare Farben

cd frontend- **inventories**: Inventar-Versionen für Sets

npm install- **inventory_parts**: Teile in Sets (Junction Table)

npm run dev  # Runs on port 5173

```### Performance-Optimierungen



### Database Access```sql

```bash-- Indizes für schnelle Queries

docker exec -it lego_projekt-db-1 psql -U lego_user -d lego_explorerCREATE INDEX idx_sets_year ON sets(year);

```CREATE INDEX idx_sets_theme_id ON sets(theme_id);

CREATE INDEX idx_sets_name ON sets USING gin(to_tsvector('english', name));

---CREATE INDEX idx_themes_name ON themes(name);

```

## 🐛 Troubleshooting

## 📁 Projektstruktur

### Reset Everything

```bash```

docker-compose down -vlego_projekt/

docker-compose up --build├── backend/

```│   ├── db-init/              # SQL Schema und Seed-Daten

│   │   ├── 01-schema.sql

### View Logs│   │   └── 02-seed.sql

```bash│   ├── src/

docker-compose logs -f│   │   ├── config/           # Konfiguration

```│   │   │   └── env.ts

│   │   ├── db/               # Datenbank-Connection

### Port Issues│   │   │   └── index.ts

```bash│   │   ├── routes/           # API Routes

# Check ports│   │   │   ├── sets.ts

lsof -i :3000│   │   │   ├── themes.ts

lsof -i :5432│   │   │   └── stats.ts

lsof -i :8080│   │   ├── lib/              # Utilities

```│   │   │   └── logger.ts

│   │   └── server.ts         # Express App

---│   ├── Dockerfile

│   └── package.json

## 📚 Documentation│

├── frontend/

- **[DOCKER_SETUP.md](./DOCKER_SETUP.md)** - Connect Docker Desktop to a repository and fix credential errors
- **[PROJEKTDOKUMENTATION.md](./PROJEKTDOKUMENTATION.md)** - Technical documentation│   ├── src/

- **[QUICK_START.md](./QUICK_START.md)** - Quick start guide│   │   ├── pages/

│   │   │   ├── LegoExplorer.jsx  # LEGO Explorer Hauptseite

---│   │   │   └── ...

│   │   ├── components/

## 🎓 Educational Focus│   │   └── App.jsx

│   ├── Dockerfile

✅ REST API design  │   └── package.json

✅ SQL queries with JOINs  │

✅ Database indexing  ├── docker-compose.yml

✅ Pagination  └── README.md

✅ Normalization (1NF, 2NF, 3NF)  ```

✅ Docker containerization  

✅ React component architecture  ## 🎯 Backend-Schwerpunkte (Lernziele)



---### ✅ Effiziente Queries

- WHERE-Klauseln mit dynamischen Filtern

## 👨‍💻 Author- JOIN-Operations für verknüpfte Daten

- Aggregation (COUNT, SUM, AVG, etc.)

**Aref Saboor**  

Syntax Institut | February 2026### ✅ Pagination & Indizes

- LIMIT und OFFSET für Pagination

---- Indizes auf häufig gesuchten Spalten

- Full-text search mit GIN-Index

## 🙏 Acknowledgments

### ✅ Strukturierte Detailansichten

LEGO® is a trademark of the LEGO Group. This project is for educational purposes only.- Normalisierte Datenbankstruktur

- Junction Tables für Many-to-Many

---- Nested queries für hierarchische Daten



**Start exploring:**## 🧪 Testen der API



```bash### Health Check

docker-compose up -d

``````bash

curl http://localhost:3000/health

Visit: http://localhost:8080curl http://localhost:3000/health/db

```

🧱 **Happy Building!** 🧱

### Sets abrufen mit Filtern

```bash
# Alle Sets
curl http://localhost:3000/api/sets

# Mit Suche und Filtern
curl "http://localhost:3000/api/sets?search=star&year_from=2020&theme_id=3"

# Sortierung
curl "http://localhost:3000/api/sets?sort_by=num_parts&sort_order=DESC&limit=5"
```

### Set-Details

```bash
curl http://localhost:3000/api/sets/75341-1
```

### Statistiken

```bash
curl http://localhost:3000/api/stats/overview
curl http://localhost:3000/api/stats/sets-by-year
curl http://localhost:3000/api/stats/sets-by-theme
```

## 🎨 Frontend-Features

- **Such- und Filterleiste**: Echtzeit-Filterung
- **Responsives Grid**: Sets als Cards dargestellt
- **Modal für Details**: Vollständige Set-Informationen mit Teileliste
- **Statistik-Banner**: Übersicht über die Datenbank
- **Pagination**: Effiziente Navigation durch große Datenmengen

## 🔧 Entwicklung

### Backend Development

```bash
cd backend
npm run dev  # Startet mit tsx watch (Hot-Reload)
```

### Frontend Development

```bash
cd frontend
npm run dev  # Startet Vite Dev Server
```

### Datenbank-Zugriff

```bash
docker exec -it lego_projekt-db-1 psql -U lego_user -d lego_explorer
```

### Nützliche SQL-Queries

```sql
-- Alle Tabellen anzeigen
\dt

-- Set-Anzahl
SELECT COUNT(*) FROM sets;

-- Sets pro Thema
SELECT t.name, COUNT(s.id) as count 
FROM themes t 
LEFT JOIN sets s ON t.id = s.theme_id 
GROUP BY t.name 
ORDER BY count DESC;

-- Größte Sets
SELECT name, num_parts 
FROM sets 
ORDER BY num_parts DESC 
LIMIT 10;
```

## 🐛 Troubleshooting

### Port bereits belegt
```bash
# Prüfen welcher Prozess Port 3000 oder 5432 verwendet
lsof -i :3000
lsof -i :5432

# Docker Container neu starten
docker-compose down
docker-compose up --build
```

### Datenbank-Verbindungsfehler
```bash
# Container-Logs prüfen
docker-compose logs db
docker-compose logs backend

# Datenbank zurücksetzen
docker-compose down -v
docker-compose up --build
```

## 📚 Weitere Informationen

- [Express.js Dokumentation](https://expressjs.com/)
- [PostgreSQL Dokumentation](https://www.postgresql.org/docs/)
- [React Dokumentation](https://react.dev/)
- [Docker Compose](https://docs.docker.com/compose/)

## 👨‍💻 Autor

Erstellt als Schulprojekt für die Syntax Institut Ausbildung.

## 📄 Lizenz

Dieses Projekt ist für Bildungszwecke erstellt worden.

---

**Viel Erfolg mit dem Projekt! 🚀🧱**
