import { Request, Response } from "express";
import { IAuthService } from "../service/auth.service";
import { InvalidBodyError } from "../../../errors/InvalidBodyError";
import { signupSchema } from "./schema/signupSchema";
import { HTTPError } from "../../../errors/HTTPError";
import { IMailNotifier } from "../../../notifiers/mail/mail.service";
import { loginSchema } from "./schema/loginSchema";

export interface IAuthController {
  signup(req: Request, res: Response): void;
  login(req: Request, res: Response): void;
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
      res.status(200).json({token});
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
