import { Request, Response } from "express";
import { IUserService } from "../service/user.service";

export interface IUserController {
  create(req: Request, res: Response): void;
}
export class UserController {
  constructor(private userService: IUserService) {}
  async create(req: Request, res: Response) {
    try {
      const user = req.body;
      const data = await this.userService.createUser(user);
      res.status(201).json(data);
    } catch (error) {
      res.status(500).send(error);
    }
  }
}
