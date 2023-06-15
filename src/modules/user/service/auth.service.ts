import { hash } from "bcrypt";
import { ISignupBody } from "../dto/ISignupBody";
import { IUserService } from "./user.service";
import { IUser } from "../model/user.schema";
export class Auth {
  constructor(private userService: IUserService) {}
  async signup(data: ISignupBody) {
    const { password } = data;
    const hashedPassword = await hash(password, 10);
    data.password = hashedPassword;
    this.userService.createUser(<IUser>data);
  }
}
