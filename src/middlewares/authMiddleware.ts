import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export function validateJwtToken(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (token == null || !authHeader?.startsWith("Bearer ")) {
      return res.sendStatus(401);
    }
  
    jwt.verify(
      token,
      <string>process.env.TOKEN_SECRET,
      (err: any, user: any) => {
        if (err) return res.sendStatus(403);
  
        next();
      }
    );
  }
  