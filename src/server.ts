import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import connectDB from './database/mongo';
import { EventRepository } from './modules/event/repository/event.repository';
import { EventService } from './modules/event/service/event.service';
import { EventController } from './modules/event/controller/event.controller';
import { EventRouter } from './modules/event/router/event.router';
import { Routes } from './routes/routes';

dotenv.config();

const app: Express = express();
const port = process.env.SERVER_PORT || 8081;

connectDB()

// init event module
const eventRepository = new EventRepository()
const eventService = new EventService(eventRepository)
const eventController = new EventController(eventService)
const eventRouter = new EventRouter(eventController)

app.use(express.json());

// global router
new Routes(app,eventRouter).init()

app.get('/', (req: Request, res: Response) => {
  res.send('OK');
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});