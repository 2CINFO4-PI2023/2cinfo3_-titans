import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import connectDB from './database/mongo';

dotenv.config();

const app: Express = express();
const port = process.env.SERVER_PORT || 8081;

connectDB()

app.get('/', (req: Request, res: Response) => {
  res.send('OK');
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});