import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import connectDB from './database/mongo';
import { UserRepository } from './modules/user/repository/user.repository';
import { UserService } from './modules/user/service/user.service';
import { UserController } from './modules/user/controller/user.controller';
import { UserRouter } from './modules/user/router/user.router';
import { Routes } from './routes/routes';

dotenv.config();

const app: Express = express();
const port = process.env.SERVER_PORT || 8081;

connectDB()

// init user module
const userRepository = new UserRepository()
const userService = new UserService(userRepository)
const userController = new UserController(userService)
const userRouter = new UserRouter(userController)

app.use(express.json());

// global router
new Routes(app,userRouter).init()

app.get('/', (req: Request, res: Response) => {
  res.send('OK');
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});