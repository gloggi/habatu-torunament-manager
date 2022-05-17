import express, { Express, Request, Response, json, } from 'express';
import "express-async-errors";
import { connect } from 'mongoose';
import dotenv from 'dotenv';
import { router } from './routes/index';
dotenv.config();
connect('mongodb://mongo:27017');
const app: Express = express();
const port = process.env.PORT;
app.use(json())
app.use(router);
app.get('/', (req: Request, res: Response) => {
  res.json({ message: "Alles guet :)" })
});
app.use(function (err: Error, req: Request, res: Response, next: any) {
  console.log("Handler called")
  console.error(err.stack);
  res.status(500).json({ message: "An Error occured" });
  next()
});
app.listen(port, () => {
  console.log(`Server is running at https://localhost:${port}`);
});