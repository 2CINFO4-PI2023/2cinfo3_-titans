import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import connectDB from './database/mongo';
import { UserRepository } from './modules/user/repository/user.repository';
import { UserService } from './modules/user/service/user.service';
import { UserController } from './modules/user/controller/user.controller';
import { UserRouter } from './modules/user/router/user.router';
import { Routes } from './routes/routes';
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

connectDB()

// init user module
const userRepository = new UserRepository()
const userService = new UserService(userRepository)
const userController = new UserController(userService)
const userRouter = new UserRouter(userController)

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
new Routes(app, userRouter, ingredientRouter, platRouter).init()

app.get('/', (req: Request, res: Response) => {
  res.send('OK');
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});