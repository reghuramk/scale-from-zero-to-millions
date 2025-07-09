import bcrypt from "bcrypt";
import { redis } from "../utils/redis";
import db from "../db/pg";
import { UserType } from "./types";

import { signAccessToken, signRefreshToken } from "../utils/jwt";

export const register = async (
  email: string,
  password: string,
  name: string,
  provider: string
): Promise<UserType> => {
  const hashedPassword: string = await bcrypt.hash(password, 10);
  const { rows } = await db.query(
    `INSERT INTO users (email, name, provider, hashedPassword) VALUES ($1, $2, $3, $4) Returning *`,
    [email, name, provider, hashedPassword]
  );
  return rows[0];
};
