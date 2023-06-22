import { compare } from "bcrypt";
import { readFileSync } from "fs";
import { NotFoundError } from "../../../errors/NotFoundError";
import { UnauthorizedError } from "../../../errors/UnauthorizedError";
import { generateAccessToken } from "../../../helpers/jwtHelper";
import { generateRandomToken } from "../../../helpers/tokenHelper";
import { IMailNotifier } from "../../../notifiers/mail/mail.service";
import { ISignupBody } from "../dto/ISignupBody";
import { IUser } from "../model/user.schema";
import { ITokenRepository } from "../repository/token.repository";
import { IUserService } from "./user.service";

export interface IAuthService {
  signup(user: any): any;
  login(credentials: any): any;
  activateUser(token: string): any;
}

export enum ROLES {
  ADMIN = 99,
  CLIENT = 1,
}
export class AuthService implements IAuthService {
  constructor(
    private userService: IUserService,
    private mailNotifier: IMailNotifier,
    private tokenRepositoy: ITokenRepository
  ) {}

  async signup(data: ISignupBody) {
    try {
      const content = readFileSync("dist/confirmation.html",'utf8').toString();
      let userData = <IUser>data;
      userData.role = ROLES.CLIENT;
      const user = await this.userService.createUser(<IUser>userData);
      const token = generateRandomToken();
      const modifiedContent = content.replace(/\[TOKEN\]/g, token);
      this.tokenRepositoy.set(token, user._id.toString(), 60 * 2);
      this.mailNotifier.sendMail(user.email, modifiedContent, "Account activation");
      return user;
    } catch (error) {
      throw error;
    }
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
      if (!user.confirmed) {
        throw new UnauthorizedError("invalid credentials");
      }

      const jwt = generateAccessToken({ user });
      return jwt;
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw new UnauthorizedError("invalid credentials");
      }
      throw error;
    }
  }
  async activateUser(token: string) {
    try {
      const id = await this.tokenRepositoy.get(token);
      if (!id) {
        throw new NotFoundError("email not found");
      }
      const user = <IUser>this.userService.getUser(id);
      user.confirmed = true;
      this.userService.updateUser(id, user);
    } catch (error) {
      throw error;
    }
  }
}
