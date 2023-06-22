import { IIngredientService } from "../service/ingredient.service";
import { HTTPError } from "../../../errors/HTTPError";
import { Request, Response } from "express";


export interface IIngredientController {
  create(req: Request, res: Response): void;
  get(req: Request, res: Response): void;
  getAll(req: Request, res: Response): void;
  update(req: Request, res: Response): void;
  delete(req: Request, res: Response): void;
}

export class IngredientController implements IIngredientController {

  constructor(private ingredientService: IIngredientService) { }
  async create(req: Request, res: Response) {
    try {
      const ingredient = req.body;
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
  async update(req: Request, res: Response) {
    try {
      const user = await this.ingredientService.updateIngredient(req.params.id, req.body);
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
}