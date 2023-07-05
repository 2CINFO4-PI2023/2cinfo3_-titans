import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import connectDB from './database/mongo';

import { UserRepository } from './modules/user/repository/user.repository';
import { UserService } from './modules/user/service/user.service';
import { UserController } from './modules/user/controller/user.controller';
import { UserRouter } from './modules/user/router/user.router';


import { ReclamationRepository } from './modules/reclamation/repository/reclamation.repository';
import { ReclamationService } from './modules/reclamation/service/reclamation.service';
import { ReclamationController } from './modules/reclamation/controller/reclamation.controller';
import { ReclamationRouter } from './modules/reclamation/router/reclamation.router';
import { Routes } from './routes/routes';
import swaggerUi from 'swagger-ui-express';
import * as fs from 'fs';
import path from 'path';

import { AuthController } from './modules/user/controller/auth.controller';
import { AuthRouter } from './modules/user/router/auth.router';
import { AuthService } from './modules/user/service/auth.service';
import { Mailer } from './notifiers/mail/mail.service';
import { CommandeRepository } from './modules/commande/repository/commande.repository';
import { CommandeService } from './modules/commande/service/commande.service';
import { CommandeController } from './modules/commande/controller/commande.controller';
import { CommandeRouter } from './modules/commande/router/commande.router';
import { PaymentRouter } from './modules/commande/router/payment.router';

dotenv.config();

const app: Express = express();
const port = process.env.SERVER_PORT || 8081;

connectDB()

// init util modules
const mailer = new Mailer()
// init user module
const userRepository = new UserRepository()
const userService = new UserService(userRepository)
const userController = new UserController(userService)
const userRouter = new UserRouter(userController)

// init reclamation module
const reclamationRepository = new ReclamationRepository()
const reclamationService = new ReclamationService(reclamationRepository)
const reclamationController = new ReclamationController(reclamationService)
const reclamationRouter = new ReclamationRouter(reclamationController)

// init commande module
const commandeRepository = new CommandeRepository()
const commandeService = new CommandeService(commandeRepository)
const commandeController = new CommandeController(commandeService)
const commandeRouter = new CommandeRouter(commandeController)

const authService = new AuthService(userService,mailer)
const authController = new AuthController(authService)
const authRouter = new AuthRouter(authController)
const paymentRouter = new PaymentRouter();


app.use(express.json());

// global router

new Routes(app,reclamationRouter,commandeRouter,paymentRouter,userRouter,authRouter,).init()


// Serve Swagger documentation
const swaggerDocument = JSON.parse(fs.readFileSync(path.join(__dirname, 'swagger.json'), 'utf-8'));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get('/', (req: Request, res: Response) => {
  res.send('OK');
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});