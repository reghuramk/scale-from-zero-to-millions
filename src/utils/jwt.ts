import jwt from "jsonwebtoken";

export const signAccessToken = (userId: string) => {
  const secret = process.env.ACCESS_TOKEN_SECRET;
  if (!secret) {
    throw new Error("ACCESS_TOKEN_SECRET is not defined");
  }
  return jwt.sign({ userId }, secret, {
    expiresIn: "15m",
  });
};

export const signRefreshToken = (userId: string) => {
  const secret = process.env.REFRESH_TOKEN_SECRET;
  if (!secret) {
    throw new Error("REFRESH_TOKEN_SECRET is not defined");
  }
  return jwt.sign({ userId }, secret, {
    expiresIn: "7d",
  });
};
