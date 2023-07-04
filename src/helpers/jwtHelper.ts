import jwt from 'jsonwebtoken';
import { IUser } from '../modules/user/model/user.schema';

export function generateAccessToken(payload:{user:IUser}) {
    return jwt.sign(payload, <string>process.env.TOKEN_SECRET, { expiresIn: '1800s' });
  }