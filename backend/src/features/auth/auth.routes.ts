import { Router, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';
import { query } from '../../db/index.js';
import { logger } from '../../lib/logger.js';
import { authMiddleware, AuthRequest } from '../../middleware/auth.js';
import { COOKIE_NAME, NODE_ENV, SESSION_DAYS } from '../../config/env.js';

const router = Router();
const isProduction = NODE_ENV === 'production';
const cookieOptions = {
  httpOnly: true,
  sameSite: 'lax' as const,
  secure: isProduction,
  maxAge: SESSION_DAYS * 24 * 60 * 60 * 1000,
};

// POST /api/auth/register - Register a new user
router.post('/register', async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;

    // Validation
    if (!username || !email || !password) {
      return res.status(400).json({ 
        success: false, 
        error: 'Username, email, and password are required' 
      });
    }

    if (password.length < 6) {
      return res.status(400).json({ 
        success: false, 
        error: 'Password must be at least 6 characters' 
      });
    }

    // Check if user already exists
    const existingUser = await query(
      'SELECT id FROM users WHERE username = $1 OR email = $2',
      [username, email]
    );

    if (existingUser.rows.length > 0) {
      return res.status(400).json({ 
        success: false, 
        error: 'Username or email already exists' 
      });
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 10);

    // Insert user
    const result = await query(
      'INSERT INTO users (username, email, password_hash) VALUES ($1, $2, $3) RETURNING id, username, email, created_at',
      [username, email, passwordHash]
    );

    const user = result.rows[0];

    // Create session
    const { token } = await createSession(user.id);
    res.cookie(COOKIE_NAME, token, cookieOptions);

    logger.info(`User registered: ${username}`);

    res.status(201).json({
      success: true,
      data: {
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          createdAt: user.created_at
        }
      }
    });
  } catch (error) {
    logger.error('Error registering user:', error);
    res.status(500).json({ success: false, error: 'Failed to register user' });
  }
});

// POST /api/auth/login - Login user
router.post('/login', async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    // Validation
    if (!username || !password) {
      return res.status(400).json({ 
        success: false, 
        error: 'Username and password are required' 
      });
    }

    // Find user
    const result = await query(
      'SELECT id, username, email, password_hash, created_at FROM users WHERE username = $1',
      [username]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ 
        success: false, 
        error: 'Invalid username or password' 
      });
    }

    const user = result.rows[0];

    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.password_hash);

    if (!isValidPassword) {
      return res.status(401).json({ 
        success: false, 
        error: 'Invalid username or password' 
      });
    }

    // Create session
    const { token } = await createSession(user.id);
    res.cookie(COOKIE_NAME, token, cookieOptions);

    logger.info(`User logged in: ${username}`);

    res.json({
      success: true,
      data: {
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          createdAt: user.created_at
        }
      }
    });
  } catch (error) {
    logger.error('Error logging in:', error);
    res.status(500).json({ success: false, error: 'Failed to log in' });
  }
});

// GET /api/auth/me - Get current user
router.get('/me', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const result = await query(
      'SELECT id, username, email, created_at FROM users WHERE id = $1',
      [req.userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ 
        success: false, 
        error: 'User not found' 
      });
    }

    const user = result.rows[0];

    res.json({
      success: true,
      data: {
        id: user.id,
        username: user.username,
        email: user.email,
        createdAt: user.created_at
      }
    });
  } catch (error) {
    logger.error('Error getting user:', error);
    res.status(500).json({ success: false, error: 'Failed to get user' });
  }
});

// POST /api/auth/logout - Clear session cookie and delete record
router.post('/logout', authMiddleware, async (req: AuthRequest, res: Response) => {
  const rawCookie = req.headers.cookie || '';
  const cookies = Object.fromEntries(
    rawCookie.split(';').map((pair) => {
      const [key, ...rest] = pair.split('=');
      return [key.trim(), decodeURIComponent(rest.join('='))];
    })
  );
  const token = cookies[COOKIE_NAME];

  if (token) {
    await query('DELETE FROM user_sessions WHERE token = $1', [token]);
  }

  res.clearCookie(COOKIE_NAME, {
    httpOnly: true,
    sameSite: 'lax',
    secure: isProduction,
  });

  res.json({
    success: true,
    message: 'Logged out successfully'
  });
});

async function createSession(userId: number) {
  const token = uuidv4();
  await query(
    `INSERT INTO user_sessions (user_id, token, expires_at)
     VALUES ($1, $2, NOW() + ($3 || ' days')::interval)`,
    [userId, token, SESSION_DAYS]
  );
  return { token };
}

export default router;
