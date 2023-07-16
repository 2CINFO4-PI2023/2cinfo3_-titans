"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Routes = void 0;
const express_1 = __importDefault(require("express"));
const authMiddleware_1 = require("../middlewares/authMiddleware");
class Routes {
    constructor(app, reclamationRouter, userRouter, authRouter, eventRouter, inscriptionRouter, eventTypeRouter, ingredientRouter, platRouter, commandeRouter, paymentRouter, livraisonRouter) {
        this.app = app;
        this.reclamationRouter = reclamationRouter;
        this.userRouter = userRouter;
        this.authRouter = authRouter;
        this.eventRouter = eventRouter;
        this.inscriptionRouter = inscriptionRouter;
        this.eventTypeRouter = eventTypeRouter;
        this.ingredientRouter = ingredientRouter;
        this.platRouter = platRouter;
        this.commandeRouter = commandeRouter;
        this.paymentRouter = paymentRouter;
        this.livraisonRouter = livraisonRouter;
    }
    init() {
        // Serve static files from the 'dist' directory
        this.app.use("/assets", express_1.default.static("dist"));
        this.app.use("/auth", this.authRouter.userRoutes);
        this.app.use("/users", authMiddleware_1.validateJwtToken, this.userRouter.userRoutes);
        this.app.use("/reclamations", authMiddleware_1.validateJwtToken, this.reclamationRouter.reclamationRoutes);
        this.app.use("/events", authMiddleware_1.validateJwtToken, this.eventRouter.eventRoutes);
        this.app.use("/inscriptions", authMiddleware_1.validateJwtToken, this.inscriptionRouter.inscriptionRoutes);
        this.app.use("/types", authMiddleware_1.validateJwtToken, this.eventTypeRouter.eventTypeRoutes);
        this.app.use("/ingredient", authMiddleware_1.validateJwtToken, this.ingredientRouter.ingredientRoutes);
        this.app.use("/plats", authMiddleware_1.validateJwtToken, this.platRouter.platRoutes);
        this.app.use("/commandes", authMiddleware_1.validateJwtToken, this.commandeRouter.commandeRoutes);
        this.app.use("/payment", this.paymentRouter.paymentRoutes);
        this.app.use("/livraison", authMiddleware_1.validateJwtToken, this.livraisonRouter.livraisonRoutes);
    }
}
exports.Routes = Routes;
