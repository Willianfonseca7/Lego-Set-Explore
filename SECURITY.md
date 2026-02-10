# 🔒 Security Documentation

## Problem Fixed: User Registration

### Issue
The `users` and `user_collections` tables were missing from the database, causing registration failures with the error: "relation 'users' does not exist".

### Solution Applied
The missing tables have been manually created with proper schema:

```sql
-- Users table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- User collections table
CREATE TABLE user_collections (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    set_num VARCHAR(50) NOT NULL REFERENCES sets(set_num) ON DELETE CASCADE,
    added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    notes TEXT,
    UNIQUE(user_id, set_num)
);

-- Performance indexes
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_username ON users(username);
CREATE INDEX idx_user_collections_user_id ON user_collections(user_id);
CREATE INDEX idx_user_collections_set_num ON user_collections(set_num);
```

**✅ You can now create accounts successfully!**

---

## How User Authentication Works

### Registration Flow
1. **Frontend** → User fills out Sign Up form (username, email, password)
2. **API Request** → POST to `http://localhost:3000/api/auth/register`
3. **Backend Validation**:
   - Checks if username/email already exists
   - Validates password length (minimum 6 characters)
4. **Password Security**:
   - Password is hashed using **bcrypt** with 10 salt rounds
   - Original password is NEVER stored in the database
5. **Database Storage**:
   - User data stored in PostgreSQL `users` table
   - Only the password hash is stored, not the actual password
6. **Token Generation**:
   - JWT token created and signed
   - Token expires in 7 days
7. **Response** → User receives their data + authentication token

### Login Flow
1. **Frontend** → User enters username and password
2. **API Request** → POST to `http://localhost:3000/api/auth/login`
3. **Backend Verification**:
   - Finds user by username
   - Compares password with stored hash using bcrypt
4. **Token Generation** → New JWT token issued
5. **Response** → User data + token returned

### Where User Data is Stored

#### Database Location
- **Container**: `lego_projekt-db-1`
- **Database Name**: `lego_explorer`
- **User**: `lego_user`
- **Volume**: `postgres_data` (persists across container restarts)

#### User Data Schema
```
users table:
├── id (integer, auto-increment)
├── username (unique, max 50 chars)
├── email (unique, max 255 chars)
├── password_hash (bcrypt hash, 255 chars)
├── created_at (timestamp)
└── updated_at (timestamp)
```

---

## Security Measures Implemented

### ✅ 1. Password Security
- **bcrypt Hashing**: Industry-standard algorithm
- **Salt Rounds**: 10 rounds (balanced security/performance)
- **No Plain Text**: Passwords never stored or logged
- **Hash Example**: `$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy`

### ✅ 2. JWT Token Authentication
- **Signed Tokens**: Using JWT_SECRET (should be changed in production)
- **Expiration**: 7-day token lifetime
- **Stateless**: No session storage needed
- **Bearer Token**: Sent in Authorization header

### ✅ 3. Database Security
- **User Isolation**: Dedicated database user `lego_user`
- **Password Protected**: Database requires authentication
- **Unique Constraints**: Prevents duplicate usernames/emails
- **Foreign Keys**: Maintains data integrity
- **Indexes**: Optimized queries, prevents table scans

### ✅ 4. Input Validation
- **Required Fields**: Username, email, password checked
- **Password Length**: Minimum 6 characters
- **Email Format**: Validated on frontend
- **SQL Injection Prevention**: Parameterized queries used

### ✅ 5. Authentication Middleware
- **Protected Routes**: Require valid JWT token
- **Token Verification**: Checks signature and expiration
- **User Context**: Extracts user info from token

---

## ⚠️ Security Recommendations for Production

### CRITICAL - Must Change Before Deployment

1. **JWT Secret**
   ```bash
   # Current (INSECURE for production)
   JWT_SECRET=fallback-secret-key
   
   # Generate a strong secret:
   openssl rand -base64 32
   # Example: xK9j2Lm5nP8qR4sT6uV7wX0yZ1aB3cD5eF6gH7iJ8kL
   ```

2. **Database Credentials**
   ```yaml
   # Current (change these!)
   POSTGRES_USER: lego_user
   POSTGRES_PASSWORD: lego_password
   
   # Use strong, random passwords:
   POSTGRES_PASSWORD: <generate-with-password-manager>
   ```

3. **HTTPS/SSL**
   - Add SSL certificates
   - Force HTTPS connections
   - Use reverse proxy (nginx, Caddy)

4. **CORS Configuration**
   ```typescript
   // backend/src/server.ts
   // Currently allows all origins - RESTRICT THIS!
   app.use(cors({ origin: 'https://yourdomain.com' }));
   ```

5. **Environment Variables**
   - Never commit `.env` files
   - Use secrets management (AWS Secrets Manager, Vault)
   - Different secrets per environment

6. **Rate Limiting**
   ```typescript
   // Add to prevent brute force attacks
   import rateLimit from 'express-rate-limit';
   
   const authLimiter = rateLimit({
     windowMs: 15 * 60 * 1000, // 15 minutes
     max: 5 // limit each IP to 5 requests per windowMs
   });
   
   app.use('/api/auth', authLimiter);
   ```

7. **Password Strength**
   - Implement password strength checker
   - Require special characters, numbers
   - Minimum 8-12 characters recommended

8. **Email Verification**
   - Send verification emails
   - Confirm email ownership
   - Prevent fake accounts

9. **Session Management**
   - Implement refresh tokens
   - Token blacklist for logout
   - Shorter access token lifetime (15-30 min)

10. **Database Backups**
    ```bash
    # Setup automated backups
    docker exec lego_projekt-db-1 pg_dump -U lego_user lego_explorer > backup.sql
    ```

---

## Current Security Status

### ✅ Good for Development
- Password hashing implemented
- JWT authentication working
- Database isolated in Docker
- Parameterized SQL queries
- Input validation

### ⚠️ NOT Production Ready
- Weak JWT secret
- Default database credentials
- No HTTPS/SSL
- No rate limiting
- CORS allows all origins
- No email verification
- Long token expiration (7 days)
- No monitoring/logging system

---

## How to Test Registration

1. **Clear browser cache/cookies** (if previous attempts failed)
2. **Navigate to** http://localhost:8080
3. **Click "Sign Up"** button
4. **Fill in the form**:
   - Username: your_username
   - Email: your@email.com
   - Password: minimum 6 characters
5. **Submit** - You should now be logged in!

### Check Your User in Database
```bash
docker exec lego_projekt-db-1 psql -U lego_user -d lego_explorer -c "SELECT id, username, email, created_at FROM users;"
```

---

## Security Best Practices Checklist

- [x] Passwords hashed with bcrypt
- [x] SQL injection prevention (parameterized queries)
- [x] JWT token authentication
- [x] Database user isolation
- [x] Unique constraints on username/email
- [ ] HTTPS/SSL encryption
- [ ] Strong JWT secret (production)
- [ ] Rate limiting
- [ ] Email verification
- [ ] Password strength requirements
- [ ] CORS restrictions
- [ ] Refresh tokens
- [ ] Security headers (helmet.js)
- [ ] Input sanitization
- [ ] Automated backups
- [ ] Security monitoring
- [ ] Two-factor authentication (2FA)

---

## Conclusion

**For Development**: ✅ Your website is reasonably secure for local development and testing.

**For Production**: ⚠️ Additional security measures are REQUIRED before deploying to the internet.

The most critical changes needed:
1. Change JWT_SECRET to a strong random value
2. Change database credentials
3. Add HTTPS/SSL
4. Implement rate limiting
5. Restrict CORS to your domain
6. Add email verification
7. Shorter token lifetime with refresh tokens

**Your data is stored securely** in a PostgreSQL database with hashed passwords and proper authentication. However, follow the production recommendations above before making this publicly accessible.
