import dotenv from 'dotenv';

dotenv.config();

export const PORT = process.env.PORT || 3000;
export const DATABASE_URL = process.env.DATABASE_URL || 'postgresql://lego_user:lego_password@localhost:5432/lego_explorer';
export const NODE_ENV = process.env.NODE_ENV || 'development';
export const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';
export const COOKIE_NAME = process.env.COOKIE_NAME || 'lego_session';
export const SESSION_DAYS = parseInt(process.env.SESSION_DAYS || '7', 10);
