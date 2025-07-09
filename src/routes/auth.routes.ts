import { Router } from "express";
import * as AuthController from '../controller/auth.controller'

const router = Router()

router.post('/register', AuthController.register)

export default router