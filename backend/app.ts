import createError from "http-errors";
import express, { NextFunction, Response } from "express";
import cookieParser from "cookie-parser";
import logger from "morgan";

import exchangeRouter from "./routes/exchange";
import { ExpressError } from "./types/express-error";

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/exchange", exchangeRouter);

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

export default app;
