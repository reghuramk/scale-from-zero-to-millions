import { Request, Response } from "express";

import * as Authservice from "../services/auth.service";
import { UserType } from "../services/types";

export const register = async (
  req: Request<unknown, unknown, UserType>,
  res: Response,
): Promise<Response> => {
  try {
    const { email, name, password, provider }: UserType = req.body;
    const user: UserType = await Authservice.register(
      email,
      password ?? "",
      name ?? "",
      provider ?? "",
    );
    return res.status(201).json({ email: user.email, id: user.id });
  } catch (error) {
    return res.status(500).json({ error, message: "Internal Server Error" });
  }
};

export const signin = async (
  req: Request<unknown, unknown, UserType>,
  res: Response,
): Promise<Response> => {
  try {
    const { email, password }: UserType = req.body;
    return res.status(201);
  } catch (error) {
    return res.status(500).json({ error, message: "User not recognised" });
  }
};

// export const refresh = async (req: Request, res: Response) => {
//   const token = req.cookies.refresh_token;
//   if (!token) return res.sendStatus(401);

//   try {
//     const payload: any = await AuthService.verifyRefreshToken(token);
//     const stored = await redis.get(`refresh:${payload.userId}`);
//     if (stored !== token) return res.sendStatus(403);

//     const newAccess = signAccessToken(payload.userId);
//     res.json({ accessToken: newAccess });
//   } catch (e) {
//     res.sendStatus(403);
//   }
// };
