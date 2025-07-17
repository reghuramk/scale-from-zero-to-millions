import cors from "cors";
import express from "express";

import { Middleware } from "./middleware";
import authRoutes from "./routes/auth.routes";

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/auth", authRoutes);

app.use(Middleware.notFoundHandler);
app.use(Middleware.errorHandler);

export default app;
