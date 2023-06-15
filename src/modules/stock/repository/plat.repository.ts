import { isValidObjectId } from "mongoose";
import { IPlat, Plat } from "../model/plat.schema";
import { InvalidObjectIdError } from "../../../errors/InvalidObjectIdError";
import { NotFoundError } from "../../../errors/NotFoundError";

export interface IPlatRepository{
    create(plat: IPlat): IPlat | Promise<IPlat>;
    get(id: string): IPlat | Promise<IPlat>;
    getAll(): IPlat[] | Promise<IPlat[]>;
    update(id: string, plat: IPlat): IPlat | Promise<IPlat>;
    delete(id: string): void;    
}

export class PlatRepository implements IPlatRepository{
    /**
     *
     */
    constructor() {}
    async create(plat: IPlat): Promise<IPlat> {
        throw new Error("Method not implemented.");
    }
    async get(id: string): Promise<IPlat> {
        try {
            if(!isValidObjectId(id)) throw new InvalidObjectIdError();
            const plat = await Plat.findById(id);
            if(plat == null) throw new NotFoundError("Plat is not found!");
            return plat;
        } catch (error) {
            throw error;
        }
    }
    async getAll(): Promise<IPlat[]> {
        try {
            const plats = await Plat.find();
            return plats;
        } catch (error) {
            throw error;
        }
    }
    async update(id: string, plat: IPlat): Promise<IPlat> {
        throw new Error("Method not implemented.");
    }
    async delete(id: string){
        try {
            if(!isValidObjectId(id)) throw new InvalidObjectIdError();
            const plat = await Plat.findByIdAndDelete(id);
            if(plat == null ) throw new NotFoundError("Plat is not found!");
        } catch (error) {
            throw error;
        }
    }


}