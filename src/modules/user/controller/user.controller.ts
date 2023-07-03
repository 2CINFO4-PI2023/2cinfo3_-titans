import { Request, Response } from "express";
import { IUserService } from "../service/user.service";
import { HTTPError } from "../../../errors/HTTPError";
import { createUserSchema } from "./schema/createSchema";
import { InvalidBodyError } from "../../../errors/InvalidBodyError";

export interface IUserController {
  create(req: Request, res: Response): void;
  getAll(req: Request, res: Response): void;
  get(req: Request, res: Response): void;
  delete(req: Request, res: Response): void;
  update(req: Request, res: Response): void;
  favoritePlat(req: Request, res: Response): void;
  addPlatToFavorite(req: Request, res: Response): void;
}
export class UserController implements IUserController {
  constructor(private userService: IUserService) {}

  async create(req: Request, res: Response) {
    try {
      const user = req.body;
      if (Object.keys(user).length === 0) {
        throw new InvalidBodyError('Empty body');
      }
      const { error } = createUserSchema.validate(req.body);
      if (error) {
        throw new InvalidBodyError(error.details[0].message);
      }
      const data = await this.userService.createUser(user);
      res.status(201).json(data);
    } catch (error: any) {
      if (error instanceof HTTPError) {
        return res
          .status(error.http_code)
          .json({ message: error.message, description: error.description });
      }
      res.status(500).send(error);
    }
  }

  async getAll(req: Request, res: Response) {
    try {
      const data = await this.userService.allUsers();
      res.status(200).json(data);
    } catch (error: any) {
      res.status(500).send(error);
    }
  }

  async get(req: Request, res: Response) {
    try {
      const data = await this.userService.getUser(req.params.id);
      res.status(200).json(data);
    } catch (error: any) {
      if (error instanceof HTTPError) {
        return res
          .status(error.http_code)
          .json({ message: error.message, description: error.description });
      }
      res.status(500).send(error);
    }
  }

  async delete(req: Request, res: Response) {
    try {
      await this.userService.deleteUser(req.params.id);
      return res.status(204).send();
    } catch (error: any) {
      if (error instanceof HTTPError) {
        return res
          .status(error.http_code)
          .json({ message: error.message, description: error.description });
      }
      res.status(500).send(error);
    }
  }

  async update(req: Request, res: Response) {
    try {
      const body = req.body;
      if (Object.keys(body).length === 0) {
        throw new InvalidBodyError('Empty body');
      }
      const { error } = createUserSchema.validate(body);
      if (error) {
        throw new InvalidBodyError(error.details[0].message);
      }
      const user = await this.userService.updateUser(req.params.id, body);
      return res.status(200).send(user);
    } catch (error: any) {
      if (error instanceof HTTPError) {
        return res
          .status(error.http_code)
          .json({ message: error.message, description: error.description });
      }
      res.status(500).send(error);
    }
  }
  async favoritePlat(req: Request, res: Response){
    try {
      const plats = await this.userService.favoritePlat(req.params.id);
      res.status(200).json(plats);
    } catch (error: any) {
      console.log(error);
      if (error instanceof HTTPError) {
        return res
          .status(error.http_code)
          .json({ message: error.message, description: error.description });
      }
      res.status(500).send(error);
    }
  }
  async addPlatToFavorite(req: Request, res: Response) {
    try {
      this.userService.addPlatToFavorite(req.params.userId, req.params.platId);
      const user = this.userService.getUser(req.params.userId);
      return res.status(200).send(user);
    } catch (error:any) {
      console.log(error);
      if (error instanceof HTTPError) {
        return res
          .status(error.http_code)
          .json({ message: error.message, description: error.description });
      }
      res.status(500).send(error);
    }
  }
}
