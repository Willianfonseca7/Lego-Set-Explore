import express, { type Request, type Response } from 'express';
import cors from 'cors';
import { PORT } from './config/env.js';
import { logger } from './lib/logger.js';
import { pool } from './db/index.js';

// Import routes
import setsRouter from './features/sets/sets.routes.js';
import themesRouter from './features/themes/themes.routes.js';
import statsRouter from './features/stats/stats.routes.js';
import authRouter from './features/auth/auth.routes.js';
import collectionsRouter from './features/collections/collections.routes.js';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Request logging middleware
app.use((req, res, next) => {
  logger.info(`${req.method} ${req.path}`);
  next();
});

// Health check
app.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Database health check
app.get('/health/db', async (req: Request, res: Response) => {
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
app.use((err: any, req: Request, res: Response, next: any) => {
  logger.error('Unhandled error:', err);
  res.status(500).json({ success: false, error: 'Internal server error' });
});

// Start server
app.listen(PORT, () => {
  logger.info(`🚀 LEGO Set Explorer API running on port ${PORT}`);
  logger.info(`Environment: ${process.env.NODE_ENV || 'development'}`);
});

// Graceful shutdown
process.on('SIGTERM', async () => {
  logger.info('SIGTERM received, closing server...');
  await pool.end();
  process.exit(0);
});
