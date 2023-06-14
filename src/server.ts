import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import connectDB from './database/mongo';
import { ReclamationRepository } from './modules/reclamation/repository/reclamation.repository';
import { ReclamationService } from './modules/reclamation/service/reclamation.service';
import { ReclamationController } from './modules/reclamation/controller/reclamation.controller';
import { ReclamationRouter } from './modules/reclamation/router/reclamation.router';
import { Routes } from './routes/routes';

dotenv.config();

const app: Express = express();
const port = process.env.SERVER_PORT || 8081;

connectDB()

// init reclamation module
const reclamationRepository = new ReclamationRepository()
const reclamationService = new ReclamationService(reclamationRepository)
const reclamationController = new ReclamationController(reclamationService)
const reclamationRouter = new ReclamationRouter(reclamationController)

app.use(express.json());

// global router
new Routes(app,reclamationRouter).init()

app.get('/', (req: Request, res: Response) => {
  res.send('OK');
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});