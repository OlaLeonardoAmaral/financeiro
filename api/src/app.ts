import "./bootstrap";
import "reflect-metadata";
import "express-async-errors";
import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import * as Sentry from "@sentry/node";
import "./database";
import uploadConfig from "./config/upload";
import AppError from "./errors/AppError";
import routers from "./routes";

Sentry.init({ dsn: process.env.SENTRY_DSN });

const bodyParser = require("body-parser");

const app = express();

let server_access_cors = [`${process.env.FRONTEND_URL}`, `${process.env.WHATSAPP_WEB}`];

app.use(cors({
  credentials: true,
  origin: server_access_cors
}));

app.use(bodyParser.json({ limit: '200mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: "200mb", extended: true, parameterLimit: 200000 }));
app.use(bodyParser.text({ limit: '200mb' }));

app.use(express.json());

app.use(cookieParser());

app.use(Sentry.Handlers.requestHandler());

app.use("/public", express.static(uploadConfig.directory));

app.use(routers);

app.use(Sentry.Handlers.errorHandler());

app.use(async (err: Error, req: Request, res: Response, _: NextFunction) => {
  if (err instanceof AppError) { return res.status(err.statusCode).json({ error: err.message }) }
  return res.status(500).json({ error: err.message });
});

export default app;
