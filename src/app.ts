import cors from "cors";
import express from "express";

import { authGuard, errorHandler } from "./middleware";
import authRoutes from "./routes/auth.routes";

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/auth", authGuard, authRoutes); // authroutes does not need authguard for now, but im just using it for now

app.use(errorHandler);

export default app;
