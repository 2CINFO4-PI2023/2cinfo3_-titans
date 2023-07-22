import { HTTPError } from "./HTTPError";

export class InvalidObjectIdError extends HTTPError {
    constructor(){
        super(400,"The id is not a valid ObjectID","Invalid field")
    }
}