import * as argon2 from "argon2";

import db from "../db/pg";
import { signAccessToken, signRefreshToken } from "../utils/jwt";
// import { redis } from "../utils/redis";
import { RegisterResponseType, UserType } from "./types";

export const register = async (
  email: string,
  password: string,
  name: string,
  provider: string,
): Promise<RegisterResponseType> => {
  try {
    const hashedPassword = await argon2.hash(password);

    const { rows }: { rows: UserType[] } = await db.query(
      `INSERT INTO users (email, name, provider, hashedPassword) VALUES ($1, $2, $3, $4) RETURNING *`,
      [email, name, provider, hashedPassword],
    );
    const user = rows[0];

    if (!user) {
      throw new Error("User insert failed: no user returned");
    }

    const accessToken: string = signAccessToken(user.id ?? "");
    const refreshToken: string = signRefreshToken(user.id ?? "");

    return { accessToken, refreshToken, user };
  } catch (error) {
    throw new Error(`User insert failed: ${(error as Error).message}`);
  }
};

// export const login = async (email: string, password: string) => {
//   try {
//   } catch (error) {
//     throw new Error("User not recognised");
//   }
// };

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
