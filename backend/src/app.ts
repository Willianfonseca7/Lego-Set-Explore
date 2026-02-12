import express, { type Request, type Response } from 'express';
import cors from 'cors';
import { FRONTEND_URL } from './utils/env.js';
import { logger } from './lib/logger.js';
import { pool } from './db/pool.js';
import setsRouter from './modules/sets/sets.routes.js';
import themesRouter from './modules/themes/themes.routes.js';
import statsRouter from './modules/stats/stats.routes.js';
import authRouter from './modules/auth/auth.routes.js';
import collectionsRouter from './modules/collections/collections.routes.js';
import { errorHandler } from './middleware/errorHandler.js';

const app = express();

// Core middleware
app.use(cors({ origin: FRONTEND_URL, credentials: true }));
app.use(express.json());

// Simple request logger
app.use((req, _res, next) => {
  logger.info(`${req.method} ${req.path}`);
  next();
});

// Health checks
app.get('/health', (_req: Request, res: Response) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.get('/health/db', async (_req: Request, res: Response) => {
  try {
    await pool.query('SELECT 1');
    res.json({ status: 'ok', database: 'connected' });
  } catch (error) {
    logger.error('Database health check failed:', error);
    res.status(503).json({ status: 'error', database: 'disconnected' });
  }
});

// API Routes
app.use('/api/sets', setsRouter);
app.use('/api/themes', themesRouter);
app.use('/api/stats', statsRouter);
app.use('/api/auth', authRouter);
app.use('/api/collections', collectionsRouter);

// 404 handler
app.use((req: Request, res: Response) => {
  res.status(404).json({ success: false, error: 'Route not found' });
});

// Error handler
app.use(errorHandler);

export default app;

