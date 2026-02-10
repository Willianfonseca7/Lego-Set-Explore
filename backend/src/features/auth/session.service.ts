import { db } from '../../db/sqlite.js';
import { type User } from './auth.types.js';
import { v4 as uuid } from 'uuid';

const insertSession = db.prepare<{
  token: string;
  user_id: number;
  expires_at: string;
}>(
  `INSERT INTO sessions (token, user_id, expires_at)
   VALUES (@token, @user_id, @expires_at)`
);

const findSession = db.prepare<{ token: string }, { user_id: number; expires_at: string } | undefined>(
  `SELECT user_id, expires_at FROM sessions WHERE token = @token`
);

const deleteSession = db.prepare<{ token: string }>(`DELETE FROM sessions WHERE token = @token`);
const deleteExpired = db.prepare(`DELETE FROM sessions WHERE expires_at <= CURRENT_TIMESTAMP`);

export function createSession(user: User, ttlMinutes = 60 * 24): string {
  const token = uuid();
  const expiresAt = new Date(Date.now() + ttlMinutes * 60 * 1000).toISOString();
  insertSession.run({ token, user_id: user.id, expires_at: expiresAt });
  return token;
}

export function getUserIdForSession(token: string): number | null {
  deleteExpired.run();
  const row = findSession.get({ token });
  if (!row) return null;
  if (new Date(row.expires_at).getTime() <= Date.now()) {
    deleteSession.run({ token });
    return null;
  }
  return row.user_id;
}

export function destroySession(token: string) {
  deleteSession.run({ token });
}
