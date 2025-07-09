import {Request, Response } from 'express'
import * as Authservice from '../services/auth.service';
import { UserType } from '../services/types';

export const register = async (req: Request, res: Response) => {
const {name, password, email, provider} = req.body
const user: UserType = await Authservice.register(email, password, name, provider)
res.status(201).json({id: user.id, email: user.email})
}