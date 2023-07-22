import { compare } from "bcrypt";
import { readFileSync } from "fs";
import { NotFoundError } from "../../../errors/NotFoundError";
import { UnauthorizedError } from "../../../errors/UnauthorizedError";
import { decodeAccessToken, generateAccessToken } from "../../../helpers/jwtHelper";
import { generateOTP, generateRandomToken } from "../../../helpers/tokenHelper";
import { IMailNotifier } from "../../../notifiers/mail/mail.service";
import { ISignupBody } from "../dto/ISignupBody";
import { IUser } from "../model/user.schema";
import { ITokenRepository } from "../repository/token.repository";
import { IUserService } from "./user.service";

var passport = require("passport");
var GoogleStrategy = require("passport-google-oidc");
var FacebookStrategy = require("passport-facebook");

export interface IAuthService {
  signup(user: any): any;
  login(credentials: any): any;
  activateUser(token: string): any;
  sendPasswordResetEmail(email: string): any;
  resetPassword(otp: string, newPassword: string): any;
  googleAuth(): any;
  facebookAuth(): any;
  createAdmin(user: IUser): Promise<IUser>
  refreshToken(token:string):string | Promise<string>
  loginWithToken(token: any): any;
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
      this.tokenRepositoy.set(token, user._id?.toString(), 60 * 30);
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

      const jwt = generateAccessToken({user});
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
      const user = await (<IUser>this.userService.findByEmail(email));
      const otp = generateOTP();
      const content = readFileSync(
        "dist/reset_password.html",
        "utf8"
      ).toString();
      // modifiedContent = content.replace(/\[TOKEN\]/g, resetToken);
      this.tokenRepositoy.set(otp, user._id?.toString(), 60 * 10);
      this.mailNotifier.sendMail(user.email, otp, "Reset password");
    } catch (error) {
      throw error;
    }
  }
  async resetPassword(otp: string, newPassword: string) {
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
  googleAuth() {
    try {
      const self = this;
      passport.use(
        new GoogleStrategy(
          {
            clientID: process.env["GOOGLE_CLIENT_ID"],
            clientSecret: process.env["GOOGLE_CLIENT_SECRET"],
            callbackURL: "http://localhost:9090/auth/google/callback",
            scope: ["profile", "email"],
          },
          async function verify(issuer: any, profile: any, cb: any) {
            try {
              const user = await self.userService.findByEmail(
                profile?.emails[0]?.value
              );
              const jwt = generateAccessToken({user});
              return cb(null, jwt);
            } catch (error) {
              if (error instanceof NotFoundError) {
                const user = await <IUser>self.userService.createUser({
                  name: profile.displayName,
                  email: profile?.emails[0]?.value,
                  phone: "",
                  address: "",
                  confirmed: true,
                  role: ROLES.CLIENT,
                  favoritePlat: []
                });
  console.log("new user: ",user)
              const jwt = generateAccessToken({user});
              return cb(null, jwt);
              } else {
                cb(error);
              }
            }
          }
        )
      );
      passport.serializeUser(function (user: any, cb: any) {
        process.nextTick(function () {
          cb(null, { id: user.id, username: user.username, name: user.name });
        });
      });

      passport.deserializeUser(function (user: any, cb: any) {
        process.nextTick(function () {
          return cb(null, user);
        });
      });
      return passport;
    } catch (error) {
      console.log("global catch");
    }
  }
  facebookAuth() {
    const self = this;
    passport.use(
      new FacebookStrategy(
        {
          clientID: process.env.FACEBOOK_APP_ID,
          clientSecret: process.env.FACEBOOK_APP_SECRET,
          callbackURL: "http://localhost:9090/auth/facebook/callback",
          state: true,
          profileFields: ['displayName', 'email']
        },
        async function (
          accessToken: any,
          refreshToken: any,
          profile: any,
          cb: any
        ) {
          try {
            const user = await self.userService.findByEmail(
              profile.email || "facebook@login.com"
            );
            return cb(null, user);
          } catch (error) {
            if (error instanceof NotFoundError) {
             const user = await self.userService.createUser({
               name: profile.displayName,
               email: profile.email || "facebook@login.com",
               phone: "",
               address: "",
               confirmed: true,
               role: ROLES.CLIENT,
               favoritePlat: []
             });
              return cb(null, user);
            } else {
              cb(error);
            }
          }
        }
      )
    );
    passport.serializeUser(function (user: any, cb: any) {
      process.nextTick(function () {
        cb(null, { id: user.id, username: user.username, name: user.name });
      });
    });

    passport.deserializeUser(function (user: any, cb: any) {
      process.nextTick(function () {
        return cb(null, user);
      });
    });
    return passport;
  }

  async createAdmin(user: IUser): Promise<IUser> {
    try {
      return await this.userService.createAdmin(user);
    } catch (error) {
      throw error;
    }
  }
  refreshToken(token:string):string{
    try {
      const decoded:any = decodeAccessToken(token)
      const accessToken = generateAccessToken({user:<IUser>decoded.user})
      return accessToken
    } catch (error) {
      throw error
    }
  }
  async loginWithToken(token: any){
    try {
    const decoded:any = decodeAccessToken(token)
    const user = <IUser>decoded.user
    const data = await this.userService.getUser(user._id?.toString() ?? "")
    return data
    } catch (error) {
      throw error
    }
  }
}
