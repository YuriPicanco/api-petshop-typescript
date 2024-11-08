import express, { Response } from "express";
import router from "./routes";
import "reflect-metadata";
import { AppDataSource } from "./config/DataSource";

const app = express();

app.use(express.json());
app.use(router);


AppDataSource.initialize()
.then(()=>{
  console.log("DB is oN!")
})


export default app;