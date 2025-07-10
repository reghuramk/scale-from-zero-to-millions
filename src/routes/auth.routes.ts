import { Router } from "express";

import * as AuthController from "../controller/auth.controller";

const router = Router();

router.post("/register", (req, res, next) => {
  Promise.resolve(AuthController.register(req, res)).catch(next);
});

export default router;
