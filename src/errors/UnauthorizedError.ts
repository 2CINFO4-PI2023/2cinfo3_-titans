import { HTTPError } from "./HTTPError";

export class UnauthorizedError extends HTTPError {
    constructor(description:string){
        super(401,description,"Unauthorized")
    }
}