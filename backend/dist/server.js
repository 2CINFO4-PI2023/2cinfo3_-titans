"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const mongo_1 = __importDefault(require("./database/mongo"));
const redis_1 = __importDefault(require("./database/redis"));
const user_controller_1 = require("./modules/user/controller/user.controller");
const user_repository_1 = require("./modules/user/repository/user.repository");
const user_router_1 = require("./modules/user/router/user.router");
const user_service_1 = require("./modules/user/service/user.service");
const fs = __importStar(require("fs"));
const path_1 = __importDefault(require("path"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const reclamation_controller_1 = require("./modules/reclamation/controller/reclamation.controller");
const reclamation_repository_1 = require("./modules/reclamation/repository/reclamation.repository");
const reclamation_router_1 = require("./modules/reclamation/router/reclamation.router");
const reclamation_service_1 = require("./modules/reclamation/service/reclamation.service");
const routes_1 = require("./routes/routes");
const event_controller_1 = require("./modules/event/controller/event.controller");
const eventType_controller_1 = require("./modules/event/controller/eventType.controller");
const inscription_controller_1 = require("./modules/event/controller/inscription.controller");
const event_repository_1 = require("./modules/event/repository/event.repository");
const eventType_repository_1 = require("./modules/event/repository/eventType.repository");
const inscription_repository_1 = require("./modules/event/repository/inscription.repository");
const event_router_1 = require("./modules/event/router/event.router");
const eventType_router_1 = require("./modules/event/router/eventType.router");
const inscription_router_1 = require("./modules/event/router/inscription.router");
const event_service_1 = require("./modules/event/service/event.service");
const eventType_service_1 = require("./modules/event/service/eventType.service");
const inscription_service_1 = require("./modules/event/service/inscription.service");
const auth_controller_1 = require("./modules/user/controller/auth.controller");
const token_repository_1 = require("./modules/user/repository/token.repository");
const auth_router_1 = require("./modules/user/router/auth.router");
const auth_service_1 = require("./modules/user/service/auth.service");
const mail_service_1 = require("./notifiers/mail/mail.service");
const express_session_1 = __importDefault(require("express-session"));
const ingredient_controller_1 = require("./modules/stock/controller/ingredient.controller");
const plat_controller_1 = require("./modules/stock/controller/plat.controller");
const ingredient_repository_1 = require("./modules/stock/repository/ingredient.repository");
const plat_repository_1 = require("./modules/stock/repository/plat.repository");
const ingredient_router_1 = require("./modules/stock/router/ingredient.router");
const plat_router_1 = require("./modules/stock/router/plat.router");
const ingredient_service_1 = require("./modules/stock/service/ingredient.service");
const plat_service_1 = require("./modules/stock/service/plat.service");
const commande_repository_1 = require("./modules/commande/repository/commande.repository");
const commande_service_1 = require("./modules/commande/service/commande.service");
const commande_controller_1 = require("./modules/commande/controller/commande.controller");
const commande_router_1 = require("./modules/commande/router/commande.router");
const payment_router_1 = require("./modules/commande/router/payment.router");
const livraison_repository_1 = require("./modules/commande/repository/livraison.repository");
const livraison_service_1 = require("./modules/commande/service/livraison.service");
const livraison_controller_1 = require("./modules/commande/controller/livraison.controller");
const livraison_router_1 = require("./modules/commande/router/livraison.router");
const passport = require('passport');
var cors = require('cors');
const bodyParser = require("body-parser");
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const port = process.env.SERVER_PORT || 8081;
const init = (app) => __awaiter(void 0, void 0, void 0, function* () {
    (0, mongo_1.default)();
    let redisClient = yield (0, redis_1.default)();
    // init util modules
    const mailer = new mail_service_1.Mailer();
    // Initialize the ingredient module
    const ingredientRepo = new ingredient_repository_1.IngredientRepository();
    const ingredientService = new ingredient_service_1.IngredientService(ingredientRepo);
    const ingredientController = new ingredient_controller_1.IngredientController(ingredientService);
    const ingredientRouter = new ingredient_router_1.IngredientRouter(ingredientController);
    // Initialize the Plat module
    const platRepo = new plat_repository_1.PlatRepository();
    const platService = new plat_service_1.PlatService(platRepo, ingredientRepo);
    const platController = new plat_controller_1.PlatController(platService);
    const platRouter = new plat_router_1.PlatRouter(platController);
    // init user module
    const tokenRepositoy = new token_repository_1.TokenRepositoy(redisClient);
    const userRepository = new user_repository_1.UserRepository();
    const userService = new user_service_1.UserService(userRepository, platRepo);
    const userController = new user_controller_1.UserController(userService);
    const userRouter = new user_router_1.UserRouter(userController);
    // init reclamation module
    const reclamationRepository = new reclamation_repository_1.ReclamationRepository();
    const reclamationService = new reclamation_service_1.ReclamationService(reclamationRepository);
    const reclamationController = new reclamation_controller_1.ReclamationController(reclamationService);
    const reclamationRouter = new reclamation_router_1.ReclamationRouter(reclamationController);
    // init commande module
    const commandeRepository = new commande_repository_1.CommandeRepository();
    const commandeService = new commande_service_1.CommandeService(commandeRepository, mailer);
    const commandeController = new commande_controller_1.CommandeController(commandeService);
    const commandeRouter = new commande_router_1.CommandeRouter(commandeController);
    const paymentRouter = new payment_router_1.PaymentRouter();
    const authService = new auth_service_1.AuthService(userService, mailer, tokenRepositoy);
    const authController = new auth_controller_1.AuthController(authService);
    const authRouter = new auth_router_1.AuthRouter(authController);
    // Initialize the inscription module
    const inscriptionRepository = new inscription_repository_1.InscriptionRepository();
    const inscriptionService = new inscription_service_1.InscriptionService(inscriptionRepository, mailer);
    const inscriptionController = new inscription_controller_1.InscriptionController(inscriptionService);
    const inscriptionRouter = new inscription_router_1.InscriptionRouter(inscriptionController);
    // Initialize the event module
    const eventRepository = new event_repository_1.EventRepository();
    const eventService = new event_service_1.EventService(eventRepository);
    const eventController = new event_controller_1.EventController(eventService);
    const eventRouter = new event_router_1.EventRouter(eventController, inscriptionController);
    // Initialize the eventType module
    const eventTypeRepository = new eventType_repository_1.EventTypeRepository();
    const eventTypeService = new eventType_service_1.EventTypeService(eventTypeRepository);
    const eventTypeController = new eventType_controller_1.EventTypeController(eventTypeService);
    const eventTypeRouter = new eventType_router_1.EventTypeRouter(eventTypeController);
    // Initialize the livraison module
    const livraisonRepository = new livraison_repository_1.LivraisonRepository();
    const livraisonService = new livraison_service_1.LivraisonService(livraisonRepository, mailer);
    const livraisonController = new livraison_controller_1.LivraisonController(livraisonService);
    const livraisonRouter = new livraison_router_1.LivraisonRouter(livraisonController);
    // init
    app.use(cors());
    app.use(express_1.default.json());
    app.use((0, express_session_1.default)({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
    }));
    new routes_1.Routes(app, reclamationRouter, userRouter, authRouter, eventRouter, inscriptionRouter, eventTypeRouter, ingredientRouter, platRouter, commandeRouter, paymentRouter, livraisonRouter).init();
    // Serve Swagger documentation
    const swaggerDocument = JSON.parse(fs.readFileSync(path_1.default.join(__dirname, "swagger.json"), "utf-8"));
    app.use("/api-docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerDocument));
    app.get("/", (req, res) => {
        res.send("OK");
    });
    app.listen(port, () => {
        console.log(`Server is running at http://localhost:${port}`);
    });
});
init(app);
