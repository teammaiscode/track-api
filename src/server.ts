import dotenv from "dotenv";
import "reflect-metadata";
import express, { NextFunction, Request, Response } from "express";
import "express-async-errors";
import ejs from "ejs";
import { routerAdmin } from "./routes/admin";
import { routerWeb } from "./routes/web";
import cors from "cors";
import compression from "compression";
import helmet from "helmet";
import "./database";

const app = express();
const port = process.env.PORT || 4000;

app.set("view engine", ejs);

dotenv.config();

app.use(express.urlencoded({ extended: true }))

app.use(express.json());
app.use(express.static("public"));
app.use(cors());
app.use(compression());
app.use(helmet());
app.use(routerAdmin);
app.use(routerWeb);

app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
  if (err instanceof Error) {
    return response.status(400).json({
      error: err.message
    })
  }

  return response.status(500).json({
    status: "error",
    message: "Internal Server Error!"
  })
})

app.use(function (req, res, next) {
  res.setHeader("Content-Type", "application/json");
  next();
});

app.listen(port, () => console.log(`Server is running on Port ${port}`));