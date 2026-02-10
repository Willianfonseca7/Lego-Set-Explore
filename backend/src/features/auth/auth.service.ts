import { db } from '../../db/sqlite.js';
import { type User } from './auth.types.js';

const insertUser = db.prepare<{
  email: string;
  name: string;
  password_hash: string;
  salt: string;
}>(
  `INSERT INTO users (email, name, password_hash, salt)
   VALUES (@email, @name, @password_hash, @salt)`
);

const findByEmail = db.prepare<{ email: string }, User>(
  `SELECT id, email, name, password_hash as passwordHash, salt
   FROM users WHERE email = @email`
);

const findById = db.prepare<{ id: number }, User>(
  `SELECT id, email, name, password_hash as passwordHash, salt
   FROM users WHERE id = @id`
);

export function registerUser(email: string, password: string, name: string): User {
  const normalizedEmail = email.trim().toLowerCase();
  const salt = ''; // no crypto salt by request
  const passwordHash = password; // storing plain password (not recommended)

  try {
    const info = insertUser.run({
      email: normalizedEmail,
      name: name.trim(),
      password_hash: passwordHash,
      salt,
    });

    return {
      id: Number(info.lastInsertRowid),
      email: normalizedEmail,
      name: name.trim(),
      passwordHash,
      salt,
    };
  } catch (error) {
    if (error instanceof Error && error.message.includes('UNIQUE')) {
      throw new Error('EMAIL_IN_USE');
    }
    throw error;
  }
}

export function verifyCredentials(email: string, password: string): User {
  const normalizedEmail = email.trim().toLowerCase();
  const user = findByEmail.get({ email: normalizedEmail });
  if (!user) {
    throw new Error('INVALID_CREDENTIALS');
  }
  if (password !== user.passwordHash) {
    throw new Error('INVALID_CREDENTIALS');
  }
  return user;
}

export function getUserByEmail(email: string): User | undefined {
  return findByEmail.get({ email: email.trim().toLowerCase() });
}

export function getUserById(id: number): User | undefined {
  return findById.get({ id });
}
