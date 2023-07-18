import { IPlatService } from "../service/plat.service";
import { HTTPError } from "../../../errors/HTTPError";
import { Request, Response } from "express";

export interface IPlatController {
    create(req: Request, res: Response): void;
    get(req: Request, res: Response): void;
    getAll(req: Request, res: Response): void;
    update(req: Request, res: Response): void;
    delete(req: Request, res: Response): void;
    platCommand(req: Request, res: Response): void;
    calculCalories(req: Request, res: Response): void;
    getlatestPlat(req: Request, res: Response): void;
}

export class PlatController implements IPlatController {

    constructor(private platService: IPlatService) { }
    async create(req: Request, res: Response) {
        try {
            const plat = req.body;
            let imageUrl: string;
            if (req.file) {
                imageUrl = `${req.protocol}://${req.get("host")}/assets/${req.file.filename}`;
                plat.image = imageUrl;
            }
            const jsonIngredients = JSON.parse(plat.ingredients);
            const ingredients = new Map();
            for (const [key, value] of Object.entries(jsonIngredients)) {
                if (ingredients.has(key)) {
                    const existingValue = ingredients.get(key);
                    const new_value = existingValue + value
                    ingredients.set(key, new_value);
                } else {
                    ingredients.set(key, value);
                }
            }
            plat.ingredients = ingredients;
            console.log(plat)
            const data = await this.platService.createPlat(plat);
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
            const data = await this.platService.getAllPlat();
            res.status(200).json(data);
        } catch (error: any) {
            res.status(500).send(error);
        }
    }
    async get(req: Request, res: Response) {
        try {
            const data = await this.platService.getPlat(req.params.id);
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
            const plat = req.body;
            let imageUrl: string;
            if (req.file) {
                imageUrl = `${req.protocol}://${req.get("host")}/assets/${req.file.filename}`;
                plat.image = imageUrl;
            }
            const jsonIngredients = JSON.parse(plat.ingredients);
            const ingredients = new Map();
            for (const [key, value] of Object.entries(jsonIngredients)) {
                if (ingredients.has(key)) {
                    const existingValue = ingredients.get(key);
                    const new_value = existingValue + value
                    ingredients.set(key, new_value);
                } else {
                    ingredients.set(key, value);
                  }
            }
            plat.ingredients = ingredients;
            console.log(plat)
            const data = await this.platService.updatePlat(req.params.id, plat);
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
            await this.platService.deletePlat(req.params.id);
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
    async platCommand(req: Request, res: Response) {
        try {
            await this.platService.commandPlat(req.params.id);
            return res.status(200).send();
        } catch (error: any) {
            if (error instanceof HTTPError) {
                return res
                    .status(error.http_code)
                    .json({ message: error.message, description: error.description });
            }
            res.status(500).send(error);
        }
    }
    async calculCalories(req: Request, res: Response) {
        try {
            const data = await this.platService.calculCalories(req.params.id);
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

    async getlatestPlat(req: Request, res: Response) {
        try {
            const data = await this.platService.getlatestPlat();
            res.status(200).json(data);
        } catch (error: any) {
            res.status(500).send(error);
        }
    }
}