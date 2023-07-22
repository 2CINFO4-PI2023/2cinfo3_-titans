import { HTTPError } from "./HTTPError";

export class NotFoundError extends HTTPError {
    constructor(description:string){
        super(404,description,"Not found")
    }
}