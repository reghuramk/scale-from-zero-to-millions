import { ErrorRequestHandler } from "express";

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  console.error("Error:", err);

  const status = err.status ?? 500;
  const message = err.message ?? "Internal Server Error";

  res.status(status).json({
    message,
    success: false,
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
};
