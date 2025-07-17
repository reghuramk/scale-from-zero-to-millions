import bcrypt from "bcryptjs";

import db from "../db/pg";
import { Constants } from "../utils/constants";
import { signAccessToken, signRefreshToken } from "../utils/jwt";
import { redis } from "../utils/redis";
import { RegisterResponseType, UserType } from "./types";

const { MESSAGES } = Constants;

export const register = async (
  email: string,
  password: string,
  name: string,
  provider: string,
  sex: string,
): Promise<RegisterResponseType> => {
  try {
    const hashedPassword: string = await bcrypt.hash(password, 10);
    const { rows }: { rows: UserType[] } = await db.query(
      `INSERT INTO users (email, name, provider, password_hash, sex) VALUES ($1, $2, $3, $4) RETURNING *`,
      [email, name, provider, hashedPassword, sex],
    );
    const user = rows[0];

    if (!user) {
      throw new Error(MESSAGES.USER_INSERT_FAILED);
    }

    const accessToken: string = signAccessToken(user.id ?? "");
    const refreshToken: string = signRefreshToken(user.id ?? "");

    await redis.set(
      `refresh:${user.id ?? ""}`,
      refreshToken,
      "EX",
      60 * 60 * 24 * 7,
    );

    return { accessToken, refreshToken, user };
  } catch (error) {
    throw new Error(
      `${MESSAGES.USER_INSERT_FAILED}: ${(error as Error).message}`,
    );
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
