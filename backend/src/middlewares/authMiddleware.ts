import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { IUser } from "../modules/user/model/user.schema";
import basicAuth from "basic-auth";
import { ROLES } from "../modules/user/service/auth.service";

export function validateJwtToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null || !authHeader?.startsWith("Bearer ")) {
    return res.sendStatus(401);
  }

  jwt.verify(token, <string>process.env.TOKEN_SECRET, (err: any, user: any) => {
    if (err) return res.sendStatus(403);

    next();
  });
}
interface payload {
  user: IUser;
}
export function authorize(allowedRoles: number[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    try {
      const decoded = <payload>(
        jwt.verify(<string>token, <string>process.env.TOKEN_SECRET)
      );
      const userRole = decoded.user.role;

      if (!allowedRoles.includes(userRole)) {
        return res.status(403).json({ message: "Forbidden" });
      }
      const id = req.params.id;
      console.log("id", id !== decoded.user._id?.toString());
      console.log("id: ", id);
      if (
        userRole === ROLES.CLIENT &&
        id &&
        id !== decoded.user._id?.toString()
      ) {
        return res.status(403).json({ message: "Forbidden not the user" });
      }

      next();
    } catch (error) {
      console.log("error", error);

      return res.status(401).json({ message: "Unauthorized" });
    }
  };
}

export function authenticateAdmin(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const credentials = basicAuth(req);
  const expectedPassword = process.env.ADMIN_PASSWORD;
  const expectedUsername = process.env.ADMIN_USERNAME;
  if (
    !credentials ||
    credentials.name !== expectedUsername ||
    credentials.pass !== expectedPassword
  ) {
    res.status(401).send("Unauthorized");
    return;
  }

  next();
}
