import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { logger } from '../lib/logger.js';

const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret-key';

export interface AuthRequest extends Request {
  userId?: number;
  username?: string;
}

export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ success: false, error: 'No token provided' });
    }

    const token = authHeader.substring(7); // Remove 'Bearer ' prefix
    
    try {
      const decoded = jwt.verify(token, JWT_SECRET) as { userId: number; username: string };
      req.userId = decoded.userId;
      req.username = decoded.username;
      next();
    } catch (error) {
      logger.error('Invalid token:', error);
      return res.status(401).json({ success: false, error: 'Invalid token' });
    }
  } catch (error) {
    logger.error('Auth middleware error:', error);
    return res.status(500).json({ success: false, error: 'Authentication failed' });
  }
};

// Optional auth middleware - doesn't fail if no token, but populates user if valid
export const optionalAuthMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.substring(7);
      
      try {
        const decoded = jwt.verify(token, JWT_SECRET) as { userId: number; username: string };
        req.userId = decoded.userId;
        req.username = decoded.username;
      } catch (error) {
        // Token is invalid, but we don't fail the request
        logger.debug('Optional auth: Invalid token');
      }
    }
    
    next();
  } catch (error) {
    // Continue even if there's an error
    next();
  }
};
