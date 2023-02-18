import express, { Express } from 'express';
import { config } from 'dotenv';
import bodyParser from 'body-parser';
import allRoutes from './routers';
import dbConnection from './models';
config();

export const app: Express = express();
const port = process.env.PORT || 3000;
const dbUrl = process.env.DB_CONNECTION_STRING;

dbConnection(dbUrl || "");



app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(allRoutes);

app.listen(port, () => {
  console.log(`⚡️[server]: Server listening on port ${port && +port}`);
});

export default app;