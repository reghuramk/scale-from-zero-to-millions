import { Router } from "express";

import * as AuthController from "../controller/auth.controller";
import { validate } from "../middleware/inputValidator";
import { registrationSchema } from "../schemas/auth.schema";
import { Constants } from "../utils/constants";

const { ROUTES } = Constants;

const router = Router();

router.post(
  ROUTES.AUTH.REGISTER,
  validate(registrationSchema),
  AuthController.register,
);

export default router;
