import { ErrorRequestHandler, NextFunction, Request, Response } from "express";

import * as Constants from "../utils/constants";

export const notFoundHandler = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const error = new Error(Constants.ROUTE_NOT_FOUND);
  res.status(404);
  next(error);
};

export const errorHandler: ErrorRequestHandler = (
  err: Error,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction,
) => {
  const statusCode: number = res.statusCode == 200 ? 500 : res.statusCode;
  const message = err.message || "Internal Server Error from error middleware";

  res.status(statusCode).json({
    message,
    success: false,
    ...(process.env.NODE_ENV === "DEVELOPMENT" && { stack: err.stack }),
  });
};
