export interface User {
  id: number;
  email: string;
  name: string;
  passwordHash: string;
  salt: string;
}

export interface SessionInfo {
  token: string;
  userId: number;
  expiresAt: Date;
}
