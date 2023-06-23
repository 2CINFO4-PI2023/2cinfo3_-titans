import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import connectDB from './database/mongo';
import { EventRepository } from './modules/event/repository/event.repository';
import { EventService } from './modules/event/service/event.service';
import { EventController } from './modules/event/controller/event.controller';
import { EventRouter } from './modules/event/router/event.router';
import { InscriptionRepository } from './modules/event/repository/inscription.repository';
import { InscriptionService } from './modules/event/service/inscription.service';
import { InscriptionController } from './modules/event/controller/inscription.controller';
import { InscriptionRouter } from './modules/event/router/inscription.router';
import { EventTypeService } from './modules/event/service/eventType.service';
import { EventTypeController } from './modules/event/controller/eventType.controller';
import { EventTypeRouter } from './modules/event/router/eventType.router';
import { Routes } from './routes/routes';
import { EventTypeRepository } from './modules/event/repository/eventType.repository';

dotenv.config();

const app: Express = express();
const port = process.env.SERVER_PORT || 8081;

connectDB();

app.use(express.json());

// Initialize the inscription module
const inscriptionRepository = new InscriptionRepository();
const inscriptionService = new InscriptionService(inscriptionRepository);
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

// Set up the routes
const routes = new Routes(app, eventRouter, inscriptionRouter, eventTypeRouter);
routes.init();

app.get('/', (req: Request, res: Response) => {
  res.send('OK');
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
