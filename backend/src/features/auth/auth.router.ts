import { Router, type Request, type Response, type NextFunction } from 'express';
import { registerUser, verifyCredentials, getUserById } from './auth.service.js';
import { createSession, getUserIdForSession, destroySession } from './session.service.js';
import { type User } from './auth.types.js';

const router = Router();

router.post('/register', (req: Request, res: Response) => {
  const { email, password, name } = req.body ?? {};
  if (!email || !password || !name) {
    return res.status(400).json({ error: 'email, password und name sind erforderlich' });
  }

  try {
    const user = registerUser(email, password, name);
    const sessionToken = createSession(user);
    setSessionCookie(res, sessionToken);
    return res.status(201).json({ id: user.id, email: user.email, name: user.name });
  } catch (error) {
    if (error instanceof Error && error.message === 'EMAIL_IN_USE') {
      return res.status(409).json({ error: 'E-Mail wird bereits verwendet' });
    }
    return res.status(500).json({ error: 'Registrierung fehlgeschlagen' });
  }
});

router.post('/login', (req: Request, res: Response) => {
  const { email, password } = req.body ?? {};
  if (!email || !password) {
    return res.status(400).json({ error: 'email und password sind erforderlich' });
  }
  try {
    const user = verifyCredentials(email, password);
    const sessionToken = createSession(user);
    setSessionCookie(res, sessionToken);
    return res.json({ id: user.id, email: user.email, name: user.name });
  } catch (error) {
    if (error instanceof Error && error.message === 'INVALID_CREDENTIALS') {
      return res.status(401).json({ error: 'E-Mail oder Passwort falsch' });
    }
    return res.status(500).json({ error: 'Login fehlgeschlagen' });
  }
});

router.post('/logout', requireSession, (req: Request, res: Response) => {
  const token = getSessionToken(req);
  if (token) destroySession(token);
  clearSessionCookie(res);
  return res.status(204).end();
});

router.get('/profile', requireSession, (req: Request, res: Response) => {
  const user = req.user!;
  return res.json({ id: user.id, email: user.email, name: user.name });
});

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}

export const authRouter = router;

function requireSession(req: Request, res: Response, next: NextFunction) {
  const token = getSessionToken(req);
  if (!token) {
    return res.status(401).json({ error: 'Session nicht gefunden' });
  }
  const userId = getUserIdForSession(token);
  if (!userId) {
    clearSessionCookie(res);
    return res.status(401).json({ error: 'Session abgelaufen oder ungültig' });
  }
  const user = getUserById(userId);
  if (!user) return res.status(401).json({ error: 'Nutzer nicht gefunden' });
  (req as Request & { user?: User }).user = user;
  return next();
}

function getSessionToken(req: Request): string | null {
  const cookieHeader = req.headers.cookie ?? '';
  const cookies = Object.fromEntries(
    cookieHeader.split(';').map((c) => {
      const [k, ...v] = c.trim().split('=');
      return [k, v.join('=')];
    }).filter(([k]) => k)
  );
  return cookies.session_id ?? null;
}

function setSessionCookie(res: Response, token: string) {
  const expires = new Date(Date.now() + 1000 * 60 * 60 * 24); // 1 Tag
  res.setHeader(
    'Set-Cookie',
    `session_id=${token}; HttpOnly; Path=/; Expires=${expires.toUTCString()}; SameSite=Lax; Domain=localhost`
  );
}

function clearSessionCookie(res: Response) {
  res.setHeader(
    'Set-Cookie',
    `session_id=; HttpOnly; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax; Domain=localhost`
  );
}
