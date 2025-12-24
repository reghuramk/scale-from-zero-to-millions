import cors from "cors";
import express from "express";

import { Middleware } from "./middleware/index.js";
import authRoutes from "./routes/auth.routes.js";
import { Constants } from "./utils/constants/index.js";

const { ROUTES } = Constants;

const app = express();
app.use(express.json());
app.use(cors());

app.use(ROUTES.AUTH.BASE, authRoutes);

app.use(Middleware.notFoundHandler);
app.use(Middleware.errorHandler);

export default app;
