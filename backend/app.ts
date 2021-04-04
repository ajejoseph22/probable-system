import createError from "http-errors";
import express, { NextFunction, Response } from "express";
import logger from "morgan";

import exchangeRoute from "./routes/exchange";
import indexRoute from "./routes/index";
import { ExpressError } from "./types/express-error";

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", indexRoute);
app.use("/exchange", exchangeRoute);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
// @ts-ignore
app.use(function (
  err: ExpressError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  // render the error page
  res.status(err.status || 500);
});

module.exports = app;
