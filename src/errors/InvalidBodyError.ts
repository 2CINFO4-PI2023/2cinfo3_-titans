import { HTTPError } from "./HTTPError";

export class InvalidBodyError extends HTTPError {
    constructor(description:string){
        super(400,description,"Invalid Body")
    }
}