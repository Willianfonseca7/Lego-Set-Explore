# 📍 Where Username and Password Are Saved

## Current User in Database

You have **1 user** registered:

| Field | Value |
|-------|-------|
| **ID** | 1 |
| **Username** | `Aref2` |
| **Email** | `arefsaboor.az@gmail.com` |
| **Password Hash** | `$2b$10$VHXF329E4TDfIbRwelwdyeoT36y4/x3vZi/Khv7KkiRlYogRuxZsq` |
| **Created** | 2026-02-10 20:05:37 |

---

## 🗄️ Physical Storage Location

### 1. **Docker Container**
```
Container Name: lego_projekt-db-1
Image: postgres:16-alpine
Status: Running
```

### 2. **Database**
```
Database Name: lego_explorer
Database User: lego_user
Port: 5432 (PostgreSQL default)
```

### 3. **Table**
```
Table Name: users
Location: public.users (public schema)
```

### 4. **Docker Volume (Physical Storage)**
```
Volume Name: postgres_data
Location on Mac: /var/lib/docker/volumes/lego_projekt_postgres_data/_data
Type: Persistent storage (survives container restarts)
```

---

## 📊 Users Table Structure

```
users
├── id              INTEGER (Primary Key, Auto-increment)
├── username        VARCHAR(50) (Unique, Not Null)
├── email           VARCHAR(255) (Unique, Not Null)
├── password_hash   VARCHAR(255) (Not Null) ⚠️ HASHED, NOT PLAIN TEXT
├── created_at      TIMESTAMP (Default: Current Time)
└── updated_at      TIMESTAMP (Default: Current Time)
```

---

## 🔒 Password Security Explained

### ❌ Your Actual Password is NOT Stored!

**What you entered**: `password123` (example)

**What is stored**: `$2b$10$VHXF329E4TDfIbRwelwdyeoT36y4/x3vZi/Khv7KkiRlYogRuxZsq`

### Understanding the Hash

```
$2b$10$VHXF329E4TDfIbRwelwdyeoT36y4/x3vZi/Khv7KkiRlYogRuxZsq
 │   │   │                                                         │
 │   │   │                                                         └─ Hash (60 chars)
 │   │   └─ Salt (22 chars) - Random data
 │   └─ Cost Factor (10 = 2^10 = 1,024 iterations)
 └─ Algorithm ($2b = bcrypt)
```

### Why This is Secure

1. **One-Way Function**: Cannot reverse the hash to get the password
2. **Unique Salt**: Same password = different hash each time
3. **Slow by Design**: Takes ~100ms to hash (prevents brute force)
4. **Industry Standard**: Used by banks, tech companies, governments

---

## 🔍 How to View Your Users

### Command Line (Terminal)

```bash
# View all users (without password hashes)
docker exec lego_projekt-db-1 psql -U lego_user -d lego_explorer -c "SELECT id, username, email, created_at FROM users;"

# View specific user
docker exec lego_projekt-db-1 psql -U lego_user -d lego_explorer -c "SELECT * FROM users WHERE username = 'Aref2';"

# Count total users
docker exec lego_projekt-db-1 psql -U lego_user -d lego_explorer -c "SELECT COUNT(*) FROM users;"

# View user with their collections
docker exec lego_projekt-db-1 psql -U lego_user -d lego_explorer -c "SELECT u.username, COUNT(uc.id) as sets_owned FROM users u LEFT JOIN user_collections uc ON u.id = uc.user_id GROUP BY u.username;"
```

### Using Database GUI Tools

You can also connect with tools like:
- **TablePlus** (Mac/Windows/Linux)
- **pgAdmin** (Free, cross-platform)
- **DBeaver** (Free, cross-platform)
- **Postico** (Mac only)

**Connection Details:**
```
Host: localhost
Port: 5432
Database: lego_explorer
Username: lego_user
Password: lego_password
```

---

## 💾 Data Persistence

### What Happens When...

| Action | Data Safe? | Explanation |
|--------|-----------|-------------|
| Restart Docker Container | ✅ YES | Data stored in volume |
| Stop Docker Compose | ✅ YES | Volume persists |
| Restart Computer | ✅ YES | Volume survives |
| `docker-compose down` | ✅ YES | Volume not deleted |
| `docker-compose down -v` | ❌ NO | **Deletes volumes!** |
| Delete `postgres_data` volume | ❌ NO | **All data lost!** |

### Backup Your Database

```bash
# Backup (save to file)
docker exec lego_projekt-db-1 pg_dump -U lego_user lego_explorer > backup_$(date +%Y%m%d).sql

# Restore (from file)
docker exec -i lego_projekt-db-1 psql -U lego_user -d lego_explorer < backup_20260210.sql
```

---

## 🔐 Password Verification Process

When you log in, here's what happens:

```
1. You enter: username="Aref2", password="password123"
   
2. Backend finds user in database:
   SELECT password_hash FROM users WHERE username = 'Aref2'
   → Gets: $2b$10$VHXF329E4TDfIbRwelwdyeoT36y4/x3vZi...
   
3. bcrypt.compare("password123", "$2b$10$VHXF329E4TDfIbRwe...")
   → Hashes your input with the stored salt
   → Compares the results
   → Returns: true ✅ or false ❌
   
4. If true: Generate JWT token and log you in
   If false: Return "Invalid credentials" error
```

**Important**: The original password is NEVER stored or compared directly!

---

## 🛡️ Security Notes

### ✅ What's Protected

1. **Passwords are Hashed**: Using bcrypt (industry standard)
2. **Database is Password Protected**: Requires `lego_password` to access
3. **Unique Usernames/Emails**: Can't register twice with same credentials
4. **SQL Injection Protected**: Uses parameterized queries
5. **Network Isolated**: Database only accessible from backend (not directly from internet)

### ⚠️ What Could Be Improved

1. **Database Password**: Change from default `lego_password`
2. **JWT Secret**: Change from default value
3. **Add HTTPS**: Encrypt data in transit
4. **Add 2FA**: Two-factor authentication
5. **Password Policies**: Enforce stronger passwords
6. **Audit Logging**: Track login attempts

---

## 📁 Related Files

```
lego_projekt/
├── backend/
│   ├── db-init/
│   │   ├── 01-schema.sql          ← Defines users table structure
│   │   └── 02-seed.sql             ← Initial data (Lego sets, not users)
│   ├── src/
│   │   ├── routes/
│   │   │   └── auth.ts             ← Registration/Login logic
│   │   ├── middleware/
│   │   │   └── auth.ts             ← JWT verification
│   │   └── db/
│   │       └── index.ts            ← Database connection
├── docker-compose.yml              ← Database configuration
└── SECURITY.md                     ← Full security documentation
```

---

## 🔧 Useful Commands

```bash
# Enter PostgreSQL shell
docker exec -it lego_projekt-db-1 psql -U lego_user -d lego_explorer

# Once inside, you can run SQL directly:
\dt                              # List all tables
\d users                         # Describe users table
SELECT * FROM users;             # View all users
\q                               # Quit

# View database logs
docker logs lego_projekt-db-1

# View backend logs (shows registration/login attempts)
docker logs lego_projekt-backend-1

# Check database size
docker exec lego_projekt-db-1 psql -U lego_user -d lego_explorer -c "SELECT pg_size_pretty(pg_database_size('lego_explorer'));"
```

---

## 🎯 Quick Summary

**Your username and password are saved in:**

1. **Container**: `lego_projekt-db-1` (PostgreSQL)
2. **Database**: `lego_explorer`
3. **Table**: `users`
4. **Physical Location**: Docker volume `postgres_data`
5. **Password Format**: Bcrypt hash (NOT plain text!)

**Your data is safe** as long as you don't delete the Docker volume. It survives container restarts and computer reboots!

---

## 🆘 Troubleshooting

### Can't Find My User?

```bash
# Check if users table exists
docker exec lego_projekt-db-1 psql -U lego_user -d lego_explorer -c "\dt"

# Check if any users exist
docker exec lego_projekt-db-1 psql -U lego_user -d lego_explorer -c "SELECT COUNT(*) FROM users;"
```

### Lost Database Connection?

```bash
# Restart database
docker-compose restart db

# Check if database is running
docker ps | grep postgres
```

### Want to Delete All Users?

```bash
# ⚠️ WARNING: This deletes ALL users!
docker exec lego_projekt-db-1 psql -U lego_user -d lego_explorer -c "DELETE FROM users;"

# Or delete specific user
docker exec lego_projekt-db-1 psql -U lego_user -d lego_explorer -c "DELETE FROM users WHERE username = 'Aref2';"
```

---

**Need to see your data?** Just run:

```bash
docker exec lego_projekt-db-1 psql -U lego_user -d lego_explorer -c "SELECT id, username, email, created_at FROM users;"
```
