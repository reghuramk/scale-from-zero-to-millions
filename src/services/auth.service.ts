import bcrypt from "bcrypt";

import db from "../db/pg";
// import { signAccessToken, signRefreshToken } from "../utils/jwt";
// import { redis } from "../utils/redis";
import { UserType } from "./types";

export const register = async (
  email: string,
  password: string,
  name: string,
  provider: string,
): Promise<UserType> => {
  try {
    const hashedPassword: string = await bcrypt.hash(password, 10);
    const { rows }: { rows: UserType[] } = await db.query(
      `INSERT INTO users (email, name, provider, hashedPassword) VALUES ($1, $2, $3, $4) RETURNING *`,
      [email, name, provider, hashedPassword],
    );
    if (!rows[0]) {
      throw new Error("User insert failed: no user returned");
    }
    return rows[0];
  } catch (error) {
    throw new Error(`User insert failed: ${(error as Error).message}`);
  }
};
