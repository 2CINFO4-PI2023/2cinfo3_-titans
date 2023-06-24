import { compare } from "bcrypt";
import { readFileSync } from "fs";
import { NotFoundError } from "../../../errors/NotFoundError";
import { UnauthorizedError } from "../../../errors/UnauthorizedError";
import { generateAccessToken } from "../../../helpers/jwtHelper";
import { generateOTP, generateRandomToken } from "../../../helpers/tokenHelper";
import { IMailNotifier } from "../../../notifiers/mail/mail.service";
import { ISignupBody } from "../dto/ISignupBody";
import { IUser } from "../model/user.schema";
import { ITokenRepository } from "../repository/token.repository";
import { IUserService } from "./user.service";

var passport = require('passport');
var GoogleStrategy = require('passport-google-oidc');

export interface IAuthService {
  signup(user: any): any;
  login(credentials: any): any;
  activateUser(token: string): any;
  sendPasswordResetEmail(email: string): any;
  resetPassword(otp:string,newPassword:string): any;
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
      let userData = <IUser>data;
      userData.role = ROLES.CLIENT;
      const user = await this.userService.createUser(<IUser>userData);
      const token = generateRandomToken();
      const content = readFileSync("dist/confirmation.html", "utf8").toString();
      const modifiedContent = content.replace(/\[TOKEN\]/g, token);
      this.tokenRepositoy.set(token, user._id.toString(), 60 * 2);
      this.mailNotifier.sendMail(
        user.email,
        modifiedContent,
        "Account activation"
      );
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
        throw new UnauthorizedError("Account not confirmed");
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
  async sendPasswordResetEmail(email: string) {
    try {
      // TODO set frontend url of reset password page
      const user = await <IUser>this.userService.findByEmail(email);
      const otp = generateOTP();
      const content = readFileSync("dist/reset_password.html", "utf8").toString();
      // modifiedContent = content.replace(/\[TOKEN\]/g, resetToken);
      this.tokenRepositoy.set(otp, user._id.toString(), 60 * 5);
      this.mailNotifier.sendMail(user.email, otp, "Reset password");
    } catch (error) {
      throw error;
    }
  }
  async resetPassword(otp:string,newPassword:string){
    try {
      const id = await this.tokenRepositoy.get(otp);
      if (!id) {
        throw new NotFoundError("otp expired");
      }
      const user = <IUser>this.userService.getUser(id);
      user.password = newPassword;
      this.userService.updateUser(id, user);
    } catch (error) {
      throw error;
    }    
  }
  googleAuth(){
    passport.use(new GoogleStrategy({
      clientID: process.env['GOOGLE_CLIENT_ID'],
      clientSecret: process.env['GOOGLE_CLIENT_SECRET'],
      callbackURL: '/auth/google/callback',
      scope: [ 'profile' ]
    }, function verify(issuer:any, profile:any, cb:any) {
      console.log("issuer: ",issuer);
      console.log("profile: ",profile);
      console.log("cb: ",cb);
    }))
    passport.serializeUser(function(user:any, cb:any) {
      process.nextTick(function() {
        cb(null, { id: user.id, username: user.username, name: user.name });
      });
    });
    
    passport.deserializeUser(function(user:any, cb:any) {
      process.nextTick(function() {
        return cb(null, user);
      });
    });
  }
}
