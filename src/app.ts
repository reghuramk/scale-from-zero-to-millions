import cors from "cors";
import express from "express";

import { errorHandler } from "./middleware";
import authRoutes from "./routes/auth.routes";

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/auth", authRoutes);

app.use(errorHandler);

export default app;
