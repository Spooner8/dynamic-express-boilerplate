import jwt from 'jsonwebtoken';
import type { Request, Response } from 'express';
import { authService } from '../services/auth/auth.ts';

const JWT_SECRET = process.env.JWT_SECRET || 'supersecret';
const maxAge = 1 * 24 * 60 * 60;

// TODO: set cookie
export const generateToken = (userId: string, username: string) => {
  const token = jwt.sign({ id: userId, username }, JWT_SECRET, { expiresIn: maxAge });
  return token;
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, JWT_SECRET);
};

export const expireToken = (req: Request, res: Response) => {
  const user = authService.getCurrentUser(req);
  if (!user) {
    return res.status(401).json({ message: 'User not found' });
  }
  res.cookie('jwt', '', { maxAge: 1, httpOnly: true });
}