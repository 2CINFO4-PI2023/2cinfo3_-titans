import { isValidObjectId } from "mongoose";
import { IPlat, Plat } from "../model/plat.schema";
import { InvalidObjectIdError } from "../../../errors/InvalidObjectIdError";
import { NotFoundError } from "../../../errors/NotFoundError";

export interface IPlatRepository {
    create(plat: IPlat): IPlat | Promise<IPlat>;
    get(id: string): IPlat | Promise<IPlat>;
    getAll(): IPlat[] | Promise<IPlat[]>;
    update(id: string, plat: IPlat): IPlat | Promise<IPlat>;
    delete(id: string): void;
    getlatestPlat(): Promise<IPlat[]>;
}

export class PlatRepository implements IPlatRepository {
    /**
     *
     */
    constructor() { }
    async create(plat: IPlat): Promise<IPlat> {
        try {
            console.info("PlatRepo: creating plat");
            const plate = await Plat.create(plat);
            console.info("PlatRepo: plat is created");
            return plate;
        } catch (err: any) {
            console.error(err);
            throw err;
        }
    }
    async get(id: string): Promise<IPlat> {
        try {
            console.info("PlatRepo: getting plat");
            if (!isValidObjectId(id)) throw new InvalidObjectIdError();
            const plat = await Plat.findById(id);
            if (plat == null) throw new NotFoundError("Plat is not found!");
            console.info("PlatRepo: plat is found");
            return plat;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
    async getAll(): Promise<IPlat[]> {
        try {
            console.info("PlatRepo: getting all plat")
            const plats = await Plat.find();
            console.info("PlatRepo: All plats are found");
            return plats;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
    async update(id: string, plat: IPlat): Promise<IPlat> {
        try {
            console.info("PlatRepo: updating plat")
            if (!isValidObjectId(id)) {
                throw new InvalidObjectIdError();
            }
            const plate = await Plat.findByIdAndUpdate(id, plat, { new: true });
            if (plate == null) {
                throw new NotFoundError("Ingredient is not found");
            }
            console.info("PlatRepo: plat is updated");
            return plate;
        } catch (err) {
            console.error(err);
            throw err;
        }
    }
    async delete(id: string) {
        try {
            console.info("PlatRepo: deleting plat")
            if (!isValidObjectId(id)) throw new InvalidObjectIdError();
            const plat = await Plat.findByIdAndDelete(id);
            console.info("PlatRepo: plat is deleted");
            if (plat == null) throw new NotFoundError("Plat is not found!");
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
    async getlatestPlat(): Promise<IPlat[]> {
        try {
            console.info("PlatRepo: getting latest plat")
            const plats = await Plat.find().sort({ updatedAt:-1}).limit(1).exec();
            if (plats == null) throw new NotFoundError("Plat is not found!");
            console.info("PlatRepo: latest plats is found");
            return plats;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

}