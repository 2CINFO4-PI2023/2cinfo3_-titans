import { Request, Response } from "express";
import { IUser } from "../model/user.schema";
import { IUserService } from "../service/user.service";
import { http } from "winston";

export class UserController {
  private userService: IUserService;
  constructor(userService: IUserService) {
    this.userService = userService;
  }
  async create(req: Request, res: Response) {
    try {
      const user = req.body;
      const data = await this.userService.createUser(user);
      res.status(201).json(data)
    } catch (error) {
        res.status(500).send(error)
    }
  }
}
