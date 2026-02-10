# 🧱 LEGO Set Explorer

A full-stack web application for browsing, searching, and collecting LEGO sets. Built with React, Node.js, PostgreSQL, and Docker.

## 📋 Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Project](#running-the-project)
- [Project Structure](#project-structure)
- [API Endpoints](#api-endpoints)
- [Database Schema](#database-schema)

---

## ✨ Features

### Public Features
- 🔍 **Search & Filter** - Search LEGO sets by name, theme, year, and part count
- 📊 **Statistics Dashboard** - View total sets, themes, parts, and year ranges
- 🎨 **Theme Categories** - Browse sets by LEGO themes (Star Wars, Technic, etc.)
- 🖼️ **Set Details** - View detailed information including images, parts list, and colors
- 📱 **Responsive Design** - Works on desktop, tablet, and mobile devices

### User Features (Authentication Required)
- 👤 **User Registration & Login** - Secure authentication with JWT tokens
- 💾 **Personal Collection** - Save and track your owned LEGO sets
- 📝 **Collection Notes** - Add personal notes to sets in your collection

---

## 🛠️ Tech Stack

### Frontend
- **Framework:** React 18.2.0
- **Build Tool:** Vite 5.1.4
- **Routing:** React Router DOM 6.22.0
- **Styling:** TailwindCSS 3.4.1
- **Dev Tools:** ESLint

### Backend
- **Runtime:** Node.js
- **Framework:** Express 4.18.2
- **Language:** TypeScript 5.6.3
- **Database:** PostgreSQL 16
- **Authentication:** JWT (jsonwebtoken), bcryptjs
- **ORM/Query:** better-sqlite3 (for local dev), pg (PostgreSQL driver)
- **Dev Tools:** tsx 4.7.0, TypeScript compiler

### Infrastructure
- **Containerization:** Docker & Docker Compose
- **Database:** PostgreSQL 16 Alpine
- **CORS:** cors 2.8.5

---

## 📦 Prerequisites

Before running this project, make sure you have the following installed:

1. **Node.js** (v20 or higher)
   - Download: https://nodejs.org/
   
2. **Docker Desktop**
   - Download: https://www.docker.com/products/docker-desktop/
   - Make sure Docker is running before starting the project

3. **Git** (for cloning the repository)
   - Download: https://git-scm.com/

---

## 🚀 Installation

### 1. Clone the Repository
```bash
git clone https://github.com/SYN-WEB-001/lego_projekt.git
cd lego_projekt
```

### 2. Install Dependencies

#### Install Root Dependencies
```bash
npm install
```

#### Install Backend Dependencies
```bash
cd backend
npm install
cd ..
```

#### Install Frontend Dependencies
```bash
cd frontend
npm install
cd ..
```

### 3. Environment Configuration

The backend uses environment variables. A `.env` file is already configured in `backend/.env`:

```env
NODE_ENV=development
DATABASE_URL=postgresql://lego_user:lego_password@localhost:5432/lego_explorer
JWT_SECRET=your-secret-key-change-this-in-production-12345
PORT=3000
```

**Note:** Change `JWT_SECRET` in production!

---

## 🏃 Running the Project

### Quick Start (All-in-One)

1. **Start Docker Desktop** (make sure it's running)

2. **Start the Database**
```bash
docker-compose up -d db
```

3. **Start Frontend & Backend**
```bash
npm run dev
```

This will start:
- **Frontend:** http://localhost:5173/ (or 5174 if 5173 is busy)
- **Backend API:** http://localhost:3000
- **Database:** PostgreSQL on port 5432

### Individual Commands

#### Start Database Only
```bash
docker-compose up -d db
```

#### Start Backend Only
```bash
npm run dev:backend
# or
cd backend
npm run dev
```

#### Start Frontend Only
```bash
npm run dev:frontend
# or
cd frontend
npm run dev
```

#### Stop Everything
```bash
docker-compose down
```

#### Rebuild Database (Fresh Start)
```bash
docker-compose down
docker volume rm lego_projekt_postgres_data
docker-compose up -d db
```

---

## 📁 Project Structure

```
lego_projekt/
├── backend/                    # Backend API (Node.js + Express + TypeScript)
│   ├── src/
│   │   ├── config/
│   │   │   └── env.ts         # Environment configuration
│   │   ├── db/
│   │   │   └── index.ts       # Database connection and query helpers
│   │   ├── lib/
│   │   │   └── logger.ts      # Logging utility
│   │   ├── middleware/
│   │   │   └── auth.ts        # JWT authentication middleware
│   │   ├── routes/
│   │   │   ├── auth.ts        # Authentication routes (register, login)
│   │   │   ├── collections.ts # User collection routes
│   │   │   ├── sets.ts        # LEGO sets routes
│   │   │   ├── themes.ts      # LEGO themes routes
│   │   │   └── stats.ts       # Statistics routes
│   │   └── server.ts          # Express server setup
│   ├── db-init/
│   │   ├── 01-schema.sql      # Database schema
│   │   └── 02-seed.sql        # Sample LEGO data
│   ├── package.json
│   ├── tsconfig.json
│   └── .env                    # Environment variables
│
├── frontend/                   # Frontend (React + Vite + TailwindCSS)
│   ├── src/
│   │   ├── components/
│   │   │   └── AuthModal.jsx  # Login/Register modal
│   │   ├── context/
│   │   │   └── AuthContext.jsx # Authentication context
│   │   ├── pages/
│   │   │   └── LegoExplorer.jsx # Main page component
│   │   ├── App.jsx            # Root component
│   │   ├── main.jsx           # Entry point
│   │   └── index.css          # Global styles
│   ├── public/
│   │   └── Logo.png           # LEGO logo
│   ├── package.json
│   ├── vite.config.ts
│   ├── tailwind.config.js
│   └── index.html
│
├── docker-compose.yml          # Docker configuration
├── package.json               # Root package.json (scripts)
└── README.md                  # This file
```

---

## 🔌 API Endpoints

### Public Endpoints

#### Sets
- `GET /api/sets` - Get all sets (with pagination, filters, search)
  - Query params: `page`, `limit`, `search`, `theme_id`, `year_from`, `year_to`, `min_parts`, `max_parts`, `sort_by`, `sort_order`
- `GET /api/sets/:setNum` - Get specific set details

#### Themes
- `GET /api/themes` - Get all themes with set counts

#### Statistics
- `GET /api/stats/overview` - Get database statistics

### Authentication Endpoints

#### Auth
- `POST /api/auth/register` - Register new user
  - Body: `{ username, email, password }`
- `POST /api/auth/login` - Login user
  - Body: `{ username, password }`
- `GET /api/auth/me` - Get current user (requires token)

### Protected Endpoints (Require Authentication)

#### Collections
- `GET /api/collections` - Get user's collection
- `POST /api/collections` - Add set to collection
  - Body: `{ setNum, notes? }`
- `DELETE /api/collections/:setNum` - Remove set from collection
- `GET /api/collections/:setNum` - Check if set is in collection

**Authentication:** Include JWT token in header:
```
Authorization: Bearer <your-token>
```

---

## 🗄️ Database Schema

### Tables

#### `users`
- User accounts and authentication
- Fields: `id`, `username`, `email`, `password_hash`, `created_at`, `updated_at`

#### `user_collections`
- User's saved LEGO sets
- Fields: `id`, `user_id`, `set_num`, `added_at`, `notes`

#### `sets`
- LEGO set information
- Fields: `id`, `set_num`, `name`, `year`, `theme_id`, `num_parts`, `img_url`

#### `themes`
- LEGO themes/categories
- Fields: `id`, `name`, `parent_id`

#### `parts`
- LEGO parts catalog
- Fields: `id`, `part_num`, `name`, `part_cat_id`

#### `colors`
- LEGO color definitions
- Fields: `id`, `name`, `rgb`, `is_trans`

#### `inventories` & `inventory_parts`
- Links sets to their parts with quantities and colors

---

## 🎨 Features in Detail

### Frontend Features

1. **Search & Filter System**
   - Text search by set name
   - Filter by theme category
   - Filter by year range
   - Filter by part count range
   - Sort by year, name, or parts count
   - Pagination (20 sets per page)

2. **User Authentication**
   - Modal-based login/register
   - Persistent sessions with JWT
   - User info displayed in header
   - Logout functionality

3. **Responsive Design**
   - Mobile-first approach
   - Grid layout adapts to screen size
   - Touch-friendly interfaces

### Backend Features

1. **RESTful API**
   - JSON responses
   - Standard HTTP status codes
   - Error handling and logging

2. **Security**
   - Password hashing with bcrypt (10 rounds)
   - JWT authentication (7-day expiry)
   - Protected routes middleware
   - CORS enabled

3. **Database**
   - PostgreSQL with connection pooling
   - Indexed queries for performance
   - Transaction support
   - Sample data included

---

## 🐛 Troubleshooting

### Port Already in Use
If port 5173, 5174, or 3000 is busy:
```bash
# Kill process on port
lsof -ti:3000 | xargs kill -9
lsof -ti:5173 | xargs kill -9
```

### Docker Not Starting
1. Make sure Docker Desktop is running
2. Check Docker has enough resources (Settings → Resources)
3. Try restarting Docker Desktop

### Database Connection Issues
```bash
# Check if database is running
docker ps

# View database logs
docker logs lego_projekt-db-1

# Restart database
docker-compose restart db
```

### Can't See LEGO Sets
1. Make sure database is running: `docker ps`
2. Check backend is running: Visit http://localhost:3000/health
3. Check browser console for errors (F12)

---

## 📝 Development Scripts

### Root Level
- `npm run dev` - Start both frontend and backend
- `npm run dev:frontend` - Start frontend only
- `npm run dev:backend` - Start backend only
- `npm run build:frontend` - Build frontend for production
- `npm run build:backend` - Build backend for production

### Backend (`cd backend`)
- `npm run dev` - Start with hot reload
- `npm run build` - Compile TypeScript
- `npm start` - Run compiled code

### Frontend (`cd frontend`)
- `npm run dev` - Start dev server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

---

## 🔐 Security Notes

1. **Change JWT Secret:** Update `JWT_SECRET` in `backend/.env` before deploying
2. **Database Credentials:** Change PostgreSQL credentials in production
3. **CORS:** Configure CORS for specific domains in production
4. **HTTPS:** Use HTTPS in production environments

---

## 👥 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is for educational purposes.

---

## 🙏 Acknowledgments

- LEGO® is a trademark of the LEGO Group
- Sample data structure inspired by Rebrickable
- Built as a learning project for full-stack development

---

## 📧 Contact

For questions or issues, please open an issue on GitHub.

---

**Happy Building! 🧱**
