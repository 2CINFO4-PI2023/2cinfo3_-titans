import { Request, Response } from "express";
import { IUserService } from "../service/user.service";
import { HTTPError } from "../../../errors/HTTPError";
import { createUserSchema } from "./schema/createSchema";
import { InvalidBodyError } from "../../../errors/InvalidBodyError";
import { updateAddressSchema } from "./schema/updateAddressSchema";
import { updateUserSchema } from "./schema/updateUserSchema";
import { IUser } from "../model/user.schema";

export interface IUserController {
  create(req: Request, res: Response): void;
  getAll(req: Request, res: Response): void;
  get(req: Request, res: Response): void;
  delete(req: Request, res: Response): void;
  update(req: Request, res: Response): void;
  favoritePlat(req: Request, res: Response): void;
  addPlatToFavorite(req: Request, res: Response): void;
  toggleConfirmation(req: Request, res: Response): void;
}
export class UserController implements IUserController {
  constructor(private userService: IUserService) {}

  async create(req: Request, res: Response) {
    try {
      const user = req.body;
      let imageUrl: string;
      if (Object.keys(user).length === 0) {
        throw new InvalidBodyError("Empty body");
      }
      const { error } = createUserSchema.validate(req.body);
      if (error) {
        throw new InvalidBodyError(error.details[0].message);
      }
      if (req.file) {
        imageUrl = `${req.protocol}://${req.get("host")}/assets/${
          req.file.filename
        }`;
        user.image = imageUrl;
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
      
      const page = parseInt(req.query.page as string) || 1;
      const pageSize = parseInt(req.query.pageSize as string) || 10;
      const filters: { [key: string]: string | number } = {};

      // Add filters to the query if they are provided in the request
      if (req.query.name) {
          filters.name = req.query.name as string;
      }

      if (req.query.email) {
          filters.email = req.query.email as string;
      }

      if (req.query.role) {
          filters.role = req.query.role as unknown as number;
      }

      if (req.query.phone) {
          filters.phone = req.query.phone as string;
      }

      const sortField = req.query.sortField as string || 'name';
      const sortOrder = req.query.sortOrder as string || 'asc';

      const data = await this.userService.allUsers(page, pageSize, filters, sortField, sortOrder);
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
        throw new InvalidBodyError("Empty body");
      }
      const { error } = updateUserSchema.validate(body);
      if (error) {
        throw new InvalidBodyError(error.details[0].message);
      }
      let imageUrl: string;
      if (req.file) {
        imageUrl = `${req.protocol}://${req.get("host")}/assets/${
          req.file.filename
        }`;
        body.image = imageUrl;
      }
      const user = await this.userService.updateUser(req.params.id, body);
      return res.status(200).send(user);
    } catch (error: any) {
      console.log("error: ",error)

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
      this.userService.addPlatToFavorite(req.params.id, req.params.platId);
      const user = this.userService.getUser(req.params.id);
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
  async toggleConfirmation(req: Request, res: Response){
    try {
      const {confirmed} = req.body
    if(confirmed == undefined){
      throw new InvalidBodyError("Missed field confirmed from the body")
    }
    const user = await this.userService.updateUser(req.params.id,<IUser>{confirmed})
    return res.status(200).send(user);
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
