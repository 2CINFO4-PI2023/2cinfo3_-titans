import express, { Express } from "express";
import { authorize, validateJwtToken } from "../middlewares/authMiddleware";
import { AuthRouter } from "../modules/user/router/auth.router";
import { UserRouter } from "../modules/user/router/user.router";
import { ReclamationRouter } from "../modules/reclamation/router/reclamation.router";
import { StatutRouter } from "../modules/statut/router/statut.router";
import { MessageRouter } from "../modules/message/router/message.router";
import { EventRouter } from "../modules/event/router/event.router";
import { InscriptionRouter } from "../modules/event/router/inscription.router";
import { EventTypeRouter } from "../modules/event/router/eventType.router";
import { IngredientRouter } from "../modules/stock/router/ingredient.router";
import { PlatRouter } from "../modules/stock/router/plat.router";
import { ROLES } from "../modules/user/service/auth.service";
import { NextFunction, Request, Response } from "express";
import { CommandeRouter } from "../modules/commande/router/commande.router";
import { PaymentRouter } from "../modules/commande/router/payment.router";
import { LivraisonRouter } from "../modules/commande/router/livraison.router";

export class Routes {
  constructor(
    private app: Express,
    private reclamationRouter: ReclamationRouter,
    private statutRouter: StatutRouter,
    private messageRouter: MessageRouter,
    private userRouter: UserRouter,
    private authRouter: AuthRouter,
    private eventRouter: EventRouter,
    private inscriptionRouter: InscriptionRouter,
    private eventTypeRouter: EventTypeRouter,
    private ingredientRouter: IngredientRouter,
    private platRouter: PlatRouter,
    private commandeRouter: CommandeRouter,
    private paymentRouter: PaymentRouter,
    private livraisonRouter: LivraisonRouter

  ) { }

  init() {
    // Serve static files from the 'dist' directory
    this.app.use("/assets", express.static("dist"));
    this.app.use("/auth", this.authRouter.userRoutes);
    this.app.use(
      "/users",
      validateJwtToken,
      this.userRouter.userRoutes
    );
    this.app.use("/message", this.messageRouter.messageRoutes)
    this.app.use("/reclamations", this.reclamationRouter.reclamationRoutes);
    this.app.use("/statuts", this.statutRouter.statutRoutes);
    this.app.use(
      "/events",
      //validateJwtToken,
      this.eventRouter.eventRoutes
    );
    this.app.use(
      "/inscriptions",
      //validateJwtToken,
      this.inscriptionRouter.inscriptionRoutes
    );
    this.app.use(
      "/types",
     // validateJwtToken,
      this.eventTypeRouter.eventTypeRoutes
    );
    this.app.use(
      "/ingredient",
      validateJwtToken,
      this.ingredientRouter.ingredientRoutes
    );
    this.app.use(
      "/plats",
      this.platRouter.platRoutes
    );
    this.app.use(
      "/commandes",
      validateJwtToken,
      this.commandeRouter.commandeRoutes
    );
    this.app.use(
      "/payment",

      this.paymentRouter.paymentRoutes
    );
    this.app.use(
      "/livraison",
      validateJwtToken,
      this.livraisonRouter.livraisonRoutes
    );
  }
}
