import { HTTPError } from "./HTTPError";

export class DuplicatedError extends HTTPError {
  constructor(description: string) {
    super(409, description, "Duplicated field");
  }
}