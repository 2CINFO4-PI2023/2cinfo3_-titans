import { IIngredientService } from "../service/ingredient.service";
import { HTTPError } from "../../../errors/HTTPError";
import { Request, Response } from "express";


export interface IIngredientController {
  create(req: Request, res: Response): void;
  get(req: Request, res: Response): void;
  getByName(req: Request, res: Response): void;
  getAll(req: Request, res: Response): void;
  update(req: Request, res: Response): void;
  delete(req: Request, res: Response): void;
  outOfStock(req: Request, res: Response): void;
}

export class IngredientController implements IIngredientController {

  constructor(private ingredientService: IIngredientService) { }
  async create(req: Request, res: Response) {
    try {
      const ingredient = req.body;
      let imageUrl: string;
      if (req.file) {
        imageUrl = `${req.protocol}://${req.get("host")}/assets/${req.file.filename}`;
        ingredient.image = imageUrl;
      }
      console.log(ingredient);
      const data = await this.ingredientService.createIngredient(ingredient);
      res.status(201).json(data);
    } catch (error) {
      if (error instanceof HTTPError)
        return res.status(error.http_code)
          .json({ message: error.message, description: error.description });
      res.status(500).send(error);
    }
  }
  async getAll(req: Request, res: Response) {
    try {
      const data = await this.ingredientService.getAllIngredient();
      res.status(200).json(data);
    } catch (error: any) {
      res.status(500).send(error);
    }
  }
  async get(req: Request, res: Response) {
    try {
      const data = await this.ingredientService.getIngredient(req.params.id);
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
  async getByName(req: Request, res: Response) {
    try {
      const data = await this.ingredientService.getIngredientByName(req.params.name);
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
  async update(req: Request, res: Response) {
    try {
      const ingredient = req.body;
      let imageUrl: string;
      if (req.file) {
        imageUrl = `${req.protocol}://${req.get("host")}/assets/${req.file.filename}`;
        ingredient.image = imageUrl;
      }
      console.log(ingredient);
      const data = await this.ingredientService.updateIngredient(req.params.id, ingredient);
      return res.status(200).send(data);
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
      await this.ingredientService.deleteIngredient(req.params.id);
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
  async outOfStock(req: Request, res: Response) {
    try {
      const data = await this.ingredientService.outOfStock();
      res.status(200).json(data);
    } catch (error: any) {
      res.status(500).send(error);
    }
  }
}