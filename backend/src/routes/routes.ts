import express, { Express } from "express";
import { authorize, validateJwtToken } from "../middlewares/authMiddleware";
import { ReclamationRouter } from "../modules/reclamation/router/reclamation.router";
import { AuthRouter } from "../modules/user/router/auth.router";
import { UserRouter } from "../modules/user/router/user.router";
import { EventRouter } from "../modules/event/router/event.router";
import { InscriptionRouter } from "../modules/event/router/inscription.router";
import { EventTypeRouter } from "../modules/event/router/eventType.router";
import { IngredientRouter } from "../modules/stock/router/ingredient.router";
import { PlatRouter } from "../modules/stock/router/plat.router";
import { ROLES } from "../modules/user/service/auth.service";
import { NextFunction, Request, Response } from "express";

export class Routes {
  constructor(
    private app: Express,
    private reclamationRouter: ReclamationRouter,
    private userRouter: UserRouter,
    private authRouter: AuthRouter,
    private eventRouter: EventRouter,
    private inscriptionRouter: InscriptionRouter,
    private eventTypeRouter: EventTypeRouter,
    private ingredientRouter: IngredientRouter,
    private platRouter: PlatRouter
  ) {}

  init() {
    // Serve static files from the 'dist' directory
    this.app.use("/assets", express.static("dist"));
    this.app.use("/auth", this.authRouter.userRoutes);
    this.app.use(
      "/users",
      validateJwtToken,
      this.userRouter.userRoutes
    );
    this.app.use(
      "/reclamations",
      validateJwtToken,
      this.reclamationRouter.reclamationRoutes
    );
    this.app.use(
      "/events",
      validateJwtToken,
      this.eventRouter.eventRoutes
    );
    this.app.use(
      "/inscriptions",
      validateJwtToken,
      this.inscriptionRouter.inscriptionRoutes
    );
    this.app.use(
      "/types",
      validateJwtToken,
      this.eventTypeRouter.eventTypeRoutes
    );
    this.app.use(
      "/ingredient",
      validateJwtToken,
      this.ingredientRouter.ingredientRoutes
    );
    this.app.use(
      "/plats",
      validateJwtToken,
      this.platRouter.platRoutes
    );
  }
}
