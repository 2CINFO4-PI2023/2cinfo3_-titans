import { IPlat } from "../model/plat.schema";
import { IPlatRepository } from "../repository/plat.repository";


export interface IPlatService{
    createPlat(plat: IPlat): IPlat | Promise<IPlat>;
    getPlat(id: string): IPlat | Promise<IPlat>;
    getAllPlat(): IPlat[] | Promise<IPlat[]>;
    updatePlat(id: string, plat: IPlat): IPlat | Promise<IPlat>;
    deletePlat(id: string): void;
}

export class PlatService implements IPlatService{
    /**
     *
     */
    constructor(private platRepo: IPlatRepository) {}
    async createPlat(plat: IPlat): Promise<IPlat> {
        try {
            return await this.platRepo.create(plat);
        } catch (error) {
            throw error;
        }
    }
    async getPlat(id: string): Promise<IPlat> {
        try {
            return await this.platRepo.get(id);
        } catch (error) {
            throw error;
        }
    }
    async getAllPlat(): Promise<IPlat[]> {
        try {
            return await this.platRepo.getAll();
        } catch (error) {
            throw error;
        }
    }
    async updatePlat(id: string, plat: IPlat):Promise<IPlat> {
        try {
            return await this.platRepo.update(id,plat);
        } catch (error) {
            throw error;
        }
    }
    async deletePlat(id: string) {
        try {
            await this.platRepo.delete(id);
        } catch (error) {
            throw error;
        }
    }
    
}