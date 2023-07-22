import { HTTPError } from "./HTTPError";

export class InsufficientStockError extends HTTPError {
    constructor(){
        super(406,"Insufficient Stock","Insufficient ingredient to this plat request another dish")
    }
}