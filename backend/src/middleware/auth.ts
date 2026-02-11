import { Request, Response, NextFunction } from 'express';
import { logger } from '../lib/logger.js';
import { COOKIE_NAME } from '../config/env.js';
import { query } from '../db/index.js';

export interface AuthRequest extends Request {
  userId?: number;
  username?: string;
}

const getTokenFromRequest = (req: Request): string | null => {
  const rawCookie = req.headers.cookie;
  if (rawCookie) {
    const cookies = Object.fromEntries(
      rawCookie.split(';').map((pair) => {
        const [key, ...rest] = pair.split('=');
        return [key.trim(), decodeURIComponent(rest.join('='))];
      })
    );
    if (cookies[COOKIE_NAME]) {
      return cookies[COOKIE_NAME];
    }
  }

  return null;
};

export const authMiddleware = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const token = getTokenFromRequest(req);

    if (!token) {
      return res.status(401).json({ success: false, error: 'No session' });
    }

    const session = await validateSession(token);
    if (!session) {
      return res.status(401).json({ success: false, error: 'Session expired or invalid' });
    }
    req.userId = session.user_id;
    req.username = session.username;
    next();
  } catch (error) {
    logger.error('Auth middleware error:', error);
    return res.status(500).json({ success: false, error: 'Authentication failed' });
  }
};

// Optional auth middleware - doesn't fail if no token, but populates user if valid
export const optionalAuthMiddleware = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const token = getTokenFromRequest(req);

    if (!token) {
      return next();
    }

    const session = await validateSession(token);
    if (session) {
      req.userId = session.user_id;
      req.username = session.username;
    }
    next();
  } catch (error) {
    // Continue even if there's an error
    next();
  }
};

async function validateSession(token: string) {
  const result = await query(
    `SELECT us.user_id, u.username
     FROM user_sessions us
     JOIN users u ON u.id = us.user_id
     WHERE us.token = $1 AND us.expires_at > NOW()`,
    [token]
  );

  return result.rows[0] || null;
}
