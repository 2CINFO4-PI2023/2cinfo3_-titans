import { compare, hash } from "bcrypt";
import { ISignupBody } from "../dto/ISignupBody";
import { IUserService } from "./user.service";
import { IUser } from "../model/user.schema";
import { IMailNotifier } from "../../../notifiers/mail/mail.service";
import { UnauthorizedError } from "../../../errors/UnauthorizedError";
import { generateAccessToken } from "../../../helpers/jwtHelper";
import { NotFoundError } from "../../../errors/NotFoundError";

export interface IAuthService {
  signup(user: any): any;
  login(credentials: any): any;
}

export class AuthService implements IAuthService {
  constructor(
    private userService: IUserService,
    private mailNotifier: IMailNotifier
  ) {}

  async signup(data: ISignupBody) {
    const { password } = data;
    const hashedPassword = await hash(password, 10);
    data.password = hashedPassword;
    const user = await this.userService.createUser(<IUser>data);
    this.mailNotifier.sendMail(
      user.email,
      "click this link to validate your account"
    );
    return user;
  }

  async login(credentials: any) {
    try {
      const user = await this.userService.findByEmail(credentials.email);
      const result = await compare(
        credentials.password,
        user.password as string
      );
      if (!result) {
        throw new UnauthorizedError("invalid credentials");
      }
      const token = generateAccessToken({ user });
      return token;
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw new UnauthorizedError("invalid credentials");
      }
      throw error;
    }
  }
}
