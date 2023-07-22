import { HTTPError } from "./HTTPError";

export class InternalError extends HTTPError {
    constructor(description:string){
        super(500,description,"Internal Error")
    }
}