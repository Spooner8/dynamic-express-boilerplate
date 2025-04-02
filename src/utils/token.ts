import jwt from 'jsonwebtoken';
import type { Request, Response } from 'express';
import { authService } from '../services/auth/auth.ts';
import type { Role } from '@prisma/client';
import db from '../services/database.ts';

const JWT_SECRET = process.env.JWT_SECRET || 'supersecret';
const JWT_EXPIRATION = parseInt(process.env.JWT_EXPIRATION || '3600', 10);
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || 'thisisreallysecret';
const REFRESH_TOKEN_EXPIRATION = parseInt(process.env.REFRESH_TOKEN_EXPIRATION || '604800', 10); // 7 days

const generateAccessToken = (userId: string, username: string, role: Role) => {
  const token = jwt.sign({ id: userId, username, role }, JWT_SECRET, { expiresIn: JWT_EXPIRATION });
  return token;
};

const verifyToken = (token: string) => {
  return jwt.verify(token, JWT_SECRET);
};

const expireToken = (req: Request, res: Response) => {
  const user = authService.getCurrentUser(req);
  if (!user) {
    return res.status(401).json({ message: 'User not found' });
  }
  res.cookie('jwt', '', { maxAge: 1, httpOnly: true });
}

const generateRefreshToken = (userId: string) => {
  const refreshToken = jwt.sign({ id: userId }, REFRESH_TOKEN_SECRET, { expiresIn: REFRESH_TOKEN_EXPIRATION });
  return refreshToken;
}

const verifyRefreshToken = (token: string) => {
  return jwt.verify(token, REFRESH_TOKEN_SECRET);
};


const saveRefreshToken = async (userId: string, refreshToken: string) => {
  await db.refreshToken.create({
    data: {
      userId,
      token: refreshToken,
      expiresAt: new Date(Date.now() + REFRESH_TOKEN_EXPIRATION * 1000),
    },
  });
}

const deleteRefreshToken = async (token: string) => {
  await db.refreshToken.deleteMany({
    where: {
      token,
    },
  });
}

const expireRefreshToken = (req: Request, res: Response) => {
  const { refreshToken } = req.cookies;
  if (!refreshToken) {
    return res.status(401).json({ message: 'Refresh token not found' });
  }

  res.cookie('refreshToken', '', { maxAge: 1, httpOnly: true });

  deleteRefreshToken(refreshToken);
}

export const tokenService = {
  generateAccessToken,
  verifyToken,
  expireToken,
  generateRefreshToken,
  verifyRefreshToken,
  saveRefreshToken,
  deleteRefreshToken,
  expireRefreshToken,
};
