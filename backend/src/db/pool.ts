import pkg from 'pg';
const { Pool } = pkg;
import { DATABASE_URL } from '../utils/env.js';
import { logger } from '../lib/logger.js';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Create PostgreSQL connection pool
export const pool = new Pool({
  connectionString: DATABASE_URL,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

pool.on('connect', () => {
  logger.info('Database connected successfully');
});

pool.on('error', (err) => {
  logger.error('Unexpected error on idle client', err);
  process.exit(-1);
});

// Auto-initialize schema and seed on first startup
async function initDatabase() {
  const client = await pool.connect();
  try {
    // Check if schema already exists
    const { rows } = await client.query(
      `SELECT to_regclass('public.themes') AS exists`
    );

    if (!rows[0].exists) {
      logger.info('Initializing database schema...');
      const schema = readFileSync(join(__dirname, '../../db-init/01-schema.sql'), 'utf-8');
      await client.query(schema);
      logger.info('Schema created.');
    }

    // Check if seed data exists
    const { rows: seedCheck } = await client.query('SELECT COUNT(*) FROM themes');
    if (parseInt(seedCheck[0].count) === 0) {
      logger.info('Seeding database...');
      const seed = readFileSync(join(__dirname, '../../db-init/02-seed.sql'), 'utf-8');
      await client.query(seed);
      logger.info('Seed data inserted.');
    }
  } catch (err) {
    logger.error('Database initialization error', err);
  } finally {
    client.release();
  }
}

initDatabase();

// Helper function to execute queries
export async function query(text: string, params?: any[]) {
  const start = Date.now();
  try {
    const res = await pool.query(text, params);
    const duration = Date.now() - start;
    logger.debug('Executed query', { text, duration, rows: res.rowCount });
    return res;
  } catch (error) {
    logger.error('Query error', { text, error });
    throw error;
  }
}

// Helper to get a client from the pool for transactions
export async function getClient() {
  const client = await pool.connect();
  return client;
}
