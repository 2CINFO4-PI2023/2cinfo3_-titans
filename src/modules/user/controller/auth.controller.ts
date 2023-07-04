import { Request, Response } from "express";
import { HTTPError } from "../../../errors/HTTPError";
import { InvalidBodyError } from "../../../errors/InvalidBodyError";
import { IAuthService } from "../service/auth.service";
import { loginSchema } from "./schema/loginSchema";
import { signupSchema } from "./schema/signupSchema";
const passport = require("passport");

export interface IAuthController {
  signup(req: Request, res: Response): void;
  login(req: Request, res: Response): void;
  activateAccount(req: Request, res: Response): void;
  sendPasswordResetEmail(req: Request, res: Response): void;
  resetPassword(req: Request, res: Response): void;
  googleAuth(req: Request, res: Response): void;
  googleLogin(req: Request, res: Response): void;
}

export class AuthController implements IAuthController {
  constructor(private authService: IAuthService) {}

  async signup(req: Request, res: Response) {
    try {
      if (Object.keys(req.body).length === 0) {
        throw new InvalidBodyError("Empty body");
      }
      const { error } = signupSchema.validate(req.body);
      if (error) {
        throw new InvalidBodyError(error.details[0].message);
      }
      const data = await this.authService.signup(req.body);
      res.status(201).json(data);
    } catch (error) {
      if (error instanceof HTTPError) {
        return res
          .status(error.http_code)
          .json({ message: error.message, description: error.description });
      }
      res.status(500).send(error);
    }
  }
  async login(req: Request, res: Response) {
    try {
      if (Object.keys(req.body).length === 0) {
        throw new InvalidBodyError("Empty body");
      }
      const { error } = loginSchema.validate(req.body);
      if (error) {
        throw new InvalidBodyError(error.details[0].message);
      }
      const token = await this.authService.login(req.body);
      res.status(200).json({ token });
    } catch (error) {
      if (error instanceof HTTPError) {
        return res
          .status(error.http_code)
          .json({ message: error.message, description: error.description });
      }
      res.status(500).send(error);
    }
  }
  activateAccount(req: Request, res: Response) {
    try {
      const token = <string>req.query.token;
      this.authService.activateUser(token);
      res.sendStatus(204);
    } catch (error) {
      if (error instanceof HTTPError) {
        return res
          .status(error.http_code)
          .json({ message: error.message, description: error.description });
      }
      res.status(500).send(error);
    }
  }

  sendPasswordResetEmail(req: Request, res: Response) {
    try {
      const email = req.body.email;
      this.authService.sendPasswordResetEmail(email);
      return res.sendStatus(204);
    } catch (error) {
      if (error instanceof HTTPError) {
        return res
          .status(error.http_code)
          .json({ message: error.message, description: error.description });
      }
      res.status(500).send(error);
    }
  }
  resetPassword(req: Request, res: Response) {
    try {
      const otp = req.body.otp;
      const newPassword = req.body.newPassword;
      this.authService.resetPassword(otp, newPassword);
      return res.sendStatus(204);
    } catch (error) {
      if (error instanceof HTTPError) {
        return res
          .status(error.http_code)
          .json({ message: error.message, description: error.description });
      }
      res.status(500).send(error);
    }
  }
  googleAuth(req: Request, res: Response) {
    try {
      return res.status(200).json({"message":"test"})
    } catch (error) {
      if (error instanceof HTTPError) {
        return res
          .status(error.http_code)
          .json({ message: error.message, description: error.description });
      }
      res.status(500).send(error);
    }
  }

  googleLogin(req: Request, res: Response) {
    try {
      this.authService.googleAuth()
      passport.authenticate('google')(req,res)
    } catch (error) {
      if (error instanceof HTTPError) {
        return res
          .status(error.http_code)
          .json({ message: error.message, description: error.description });
      }
      res.status(500).send(error);
    }
  }
}
