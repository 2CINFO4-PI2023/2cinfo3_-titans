import jwt from 'jsonwebtoken';

export function generateAccessToken(payload:any) {
    return jwt.sign(payload, <string>process.env.TOKEN_SECRET, { expiresIn: '1800s' });
  }