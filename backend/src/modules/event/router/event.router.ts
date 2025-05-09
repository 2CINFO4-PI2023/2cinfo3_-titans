import { Router } from "express";
import { IEventController } from "../controller/event.controller";
import { IInscriptionController } from "../controller/inscription.controller";
import { multerConfig } from "../../../config/multer";
const upload = multerConfig();

export class EventRouter {
  private _eventRoutes: Router = Router();
  constructor(
    private eventController: IEventController,
    private inscriptionController: IInscriptionController
  ) {
    this.init();
  }
  public get eventRoutes() {
    return this._eventRoutes;
  }
  private init() {

    this._eventRoutes.route("").post(upload.single("image"),(req, res) => {
      this.eventController.create(req, res);
    }).get((req, res) => {
      this.eventController.getAll(req, res);
    });

    
    this._eventRoutes.route("/:id").get((req, res) => {
      this.eventController.get(req, res);
    }).put(upload.single("image"),(req, res) => {
      this.eventController.update(req, res);
    }).delete((req, res) => {
      this.eventController.delete(req, res);
    });

    // Route to create an inscription for an event
    this._eventRoutes.route("/:id/inscriptions").post((req, res) => {
      this.inscriptionController.create(req, res);
    });
    
    

  }
}
