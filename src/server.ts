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
import { InscriptionRepository } from "./modules/event/repository/inscription.repository";
import { InscriptionService } from "./modules/event/service/inscription.service";
import { InscriptionController } from "./modules/event/controller/inscription.controller";
import { InscriptionRouter } from "./modules/event/router/inscription.router";
import { EventRepository } from "./modules/event/repository/event.repository";
import { EventService } from "./modules/event/service/event.service";
import { EventController } from "./modules/event/controller/event.controller";
import { EventRouter } from "./modules/event/router/event.router";
import { EventTypeController } from "./modules/event/controller/eventType.controller";
import { EventTypeRepository } from "./modules/event/repository/eventType.repository";
import { EventTypeRouter } from "./modules/event/router/eventType.router";
import { EventTypeService } from "./modules/event/service/eventType.service";

import { IngredientRepository } from "./modules/stock/repository/ingredient.repository";
import { IngredientService } from "./modules/stock/service/ingredient.service";
import { IngredientController } from "./modules/stock/controller/ingredient.controller";
import { IngredientRouter } from "./modules/stock/router/ingredient.router";
import { PlatRepository } from "./modules/stock/repository/plat.repository";
import { PlatService } from "./modules/stock/service/plat.service";
import { PlatController } from "./modules/stock/controller/plat.controller";
import { PlatRouter } from "./modules/stock/router/plat.router";
import session from "express-session";
const passport = require("passport");
const bodyParser = require("body-parser");

import redisConnect from "connect-redis";
import { CommandeRepository } from "./modules/commande/repository/commande.repository";
import { CommandeService } from "./modules/commande/service/commande.service";
import { CommandeController } from "./modules/commande/controller/commande.controller";
import { CommandeRouter } from "./modules/commande/router/commande.router";
import { PaymentRouter } from "./modules/commande/router/payment.router";
import { LivraisonRepository } from "./modules/commande/repository/livraison.repository";
import { LivraisonService } from "./modules/commande/service/livraison.service";
import { LivraisonController } from "./modules/commande/controller/livraison.controller";
import { LivraisonRouter } from "./modules/commande/router/livraison.router";

dotenv.config();

const app: Express = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const port = process.env.SERVER_PORT || 8081;

const init = async (app: Express) => {
  connectDB();
  let redisClient: any = await connectRedis();
  // init util modules
  const mailer = new Mailer();

  // Initialize the ingredient module
  const ingredientRepo = new IngredientRepository();
  const ingredientService = new IngredientService(ingredientRepo);
  const ingredientController = new IngredientController(ingredientService);
  const ingredientRouter = new IngredientRouter(ingredientController);

  // Initialize the Plat module
  const platRepo = new PlatRepository();
  const platService = new PlatService(platRepo, ingredientRepo);
  const platController = new PlatController(platService);
  const platRouter = new PlatRouter(platController);

  // init user module
  const tokenRepositoy = new TokenRepositoy(redisClient);
  const userRepository = new UserRepository();
  const userService = new UserService(userRepository, platRepo);
  const userController = new UserController(userService);
  const userRouter = new UserRouter(userController);

  // init reclamation module
  const reclamationRepository = new ReclamationRepository();
  const reclamationService = new ReclamationService(reclamationRepository);
  const reclamationController = new ReclamationController(reclamationService);
  const reclamationRouter = new ReclamationRouter(reclamationController);
  // init commande module
  const commandeRepository = new CommandeRepository();
  const commandeService = new CommandeService(commandeRepository, mailer);
  const commandeController = new CommandeController(commandeService);

  const commandeRouter = new CommandeRouter(commandeController);
  const paymentRouter = new PaymentRouter();

  const authService = new AuthService(userService, mailer, tokenRepositoy);
  const authController = new AuthController(authService);
  const authRouter = new AuthRouter(authController);
  // Initialize the inscription module
  const inscriptionRepository = new InscriptionRepository();
  const inscriptionService = new InscriptionService(
    inscriptionRepository,
    mailer
  );
  const inscriptionController = new InscriptionController(inscriptionService);
  const inscriptionRouter = new InscriptionRouter(inscriptionController);

  // Initialize the event module
  const eventRepository = new EventRepository();
  const eventService = new EventService(eventRepository);
  const eventController = new EventController(eventService);
  const eventRouter = new EventRouter(eventController, inscriptionController);

  // Initialize the eventType module
  const eventTypeRepository = new EventTypeRepository();
  const eventTypeService = new EventTypeService(eventTypeRepository);
  const eventTypeController = new EventTypeController(eventTypeService);
  const eventTypeRouter = new EventTypeRouter(eventTypeController);

  // Initialize the livraison module
  const livraisonRepository = new LivraisonRepository();
  const livraisonService = new LivraisonService(livraisonRepository, mailer);
  const livraisonController = new LivraisonController(livraisonService);
  const livraisonRouter = new LivraisonRouter(livraisonController);

  new Routes(
    app,
    reclamationRouter,
    userRouter,
    authRouter,
    eventRouter,
    inscriptionRouter,
    eventTypeRouter,
    ingredientRouter,
    platRouter,
    commandeRouter,
    paymentRouter,
    livraisonRouter
  ).init();

  // init
  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());

  app.use(
    session({
      secret: <string>process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
    })
  );

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

init(app);
