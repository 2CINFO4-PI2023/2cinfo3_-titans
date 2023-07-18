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
    calculCalories(req:Request, res: Response):void;
    getlatestPlat(req:Request, res: Response):void;
}

export class PlatController implements IPlatController {

    constructor(private platService: IPlatService) { }
    async create(req: Request, res: Response) {
        try {
            const plat = req.body;
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
            const data = await this.platService.getAllPlatWithIngredients();
            res.status(200).json(data);
        } catch (error: any) {
            res.status(500).send(error);
        }
    }
    async get(req: Request, res: Response) {
        try {
            const data = await this.platService.getPlatWithIngredients(req.params.id);
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
            const data = await this.platService.updatePlat(req.params.id, req.body);
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
    async platCommand(req: Request, res: Response){
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
    async calculCalories(req: Request, res:Response){
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