import { Router } from "express";

import * as AuthController from "../controller/auth.controller";
import { validate } from "../middleware/inputValidator";
import { registrationSchema } from "../schemas/auth.schema";

const router = Router();

router.post("/register", validate(registrationSchema), AuthController.register);

export default router;
