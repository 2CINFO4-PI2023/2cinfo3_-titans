import dotenv from "dotenv";
import express, { Express, Request, Response } from "express";
import connectDB from "./database/mongo";
import connectRedis from "./database/redis";

import { UserController } from "./modules/user/controller/user.controller";
import { UserRepository } from "./modules/user/repository/user.repository";
import { UserRouter } from "./modules/user/router/user.router";
import { UserService } from "./modules/user/service/user.service";

import * as fs from "fs";
import path from "path";
import swaggerUi from "swagger-ui-express";
import { ReclamationController } from "./modules/reclamation/controller/reclamation.controller";
import { ReclamationRepository } from "./modules/reclamation/repository/reclamation.repository";
import { ReclamationRouter } from "./modules/reclamation/router/reclamation.router";
import { ReclamationService } from "./modules/reclamation/service/reclamation.service";
import { Routes } from "./routes/routes";

import { AuthController } from "./modules/user/controller/auth.controller";
import { TokenRepositoy } from "./modules/user/repository/token.repository";
import { AuthRouter } from "./modules/user/router/auth.router";
import { AuthService } from "./modules/user/service/auth.service";
import { Mailer } from "./notifiers/mail/mail.service";

import { IngredientRepository } from './modules/stock/repository/ingredient.repository';
import { IngredientService } from './modules/stock/service/ingredient.service';
import { IngredientController } from './modules/stock/controller/ingredient.controller';
import { IngredientRouter } from './modules/stock/router/ingredient.router';
import { PlatRepository } from './modules/stock/repository/plat.repository';
import { PlatService } from './modules/stock/service/plat.service';
import { PlatController } from './modules/stock/controller/plat.controller';
import { PlatRouter } from './modules/stock/router/plat.router';

dotenv.config();

const app: Express = express();
const port = process.env.SERVER_PORT || 8081;

const init = async (app: Express) => {
  connectDB();
  let redisClient: any = await connectRedis();
  // init util modules
  const mailer = new Mailer();
  // init user module
  const tokenRepositoy = new TokenRepositoy(redisClient);
  const userRepository = new UserRepository();
  const userService = new UserService(userRepository);
  const userController = new UserController(userService);
  const userRouter = new UserRouter(userController);

  // init reclamation module
  const reclamationRepository = new ReclamationRepository();
  const reclamationService = new ReclamationService(reclamationRepository);
  const reclamationController = new ReclamationController(reclamationService);
  const reclamationRouter = new ReclamationRouter(reclamationController);

  const authService = new AuthService(userService, mailer, tokenRepositoy);
  const authController = new AuthController(authService);
  const authRouter = new AuthRouter(authController);

  // init
  app.use(express.json());
const ingredientRepo = new IngredientRepository()
const ingredientService = new IngredientService(ingredientRepo)
const ingredientController = new IngredientController(ingredientService)
const ingredientRouter = new IngredientRouter(ingredientController)

const platRepo = new PlatRepository()
const platService = new PlatService(platRepo, ingredientRepo)
const platController = new PlatController(platService)
const platRouter = new PlatRouter(platController)

app.use(express.json());

  // global router
  new Routes(app, reclamationRouter, userRouter, authRouter,ingredientRouter,platRouter).init();

  // Serve Swagger documentation
  const swaggerDocument = JSON.parse(
    fs.readFileSync(path.join(__dirname, "swagger.json"), "utf-8")
  );
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

  app.get("/", (req: Request, res: Response) => {
    res.send("OK");
  });
  
  app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
  });
};

init(app)