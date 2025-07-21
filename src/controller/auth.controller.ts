import { NextFunction, Request, Response } from "express";

import * as Authservice from "../services/auth.service";
import {
  // GoogleSigninResponseType,
  RegisterResponseType,
  UserType,
} from "../services/types";
import { Constants } from "../utils/constants";

const { MESSAGES, TOKENS } = Constants;

export const register = async (
  req: Request<unknown, unknown, UserType>,
  res: Response,
  next: NextFunction,
): Promise<Response | undefined> => {
  try {
    const { email, name, password, provider, sex }: UserType = req.body;
    const { accessToken, refreshToken, user }: RegisterResponseType =
      await Authservice.register(
        email,
        password ?? "",
        name ?? "",
        provider ?? "",
        sex,
      );

    res.cookie(TOKENS.ACCESS_TOKEN, accessToken, {
      httpOnly: true,
      maxAge: 15 * 60 * 1000,
      sameSite: "strict",
      secure: true,
    });

    res.cookie(TOKENS.REFRESH_TOKEN, refreshToken, {
      httpOnly: true,
      maxAge: 30 * 24 * 60 * 60 * 1000,
      sameSite: "strict",
      secure: true,
    });

    return res.status(201).json({
      email: user.email,
      id: user.id,
      message: MESSAGES.USER_INSERT_SUCCEEDED,
    });
  } catch (error) {
    next(error);
  }
};

// export const googleLogin = async (
//   res: Response,
//   req: Request,
//   next: NextFunction,
// ): Promise<Response | undefined> => {
//   try {
//     const { idToken }: { idToken: string } = req.body;
//     const { name, email, googleId, picture }: GoogleSigninResponseType =
//       await Authservice.verifyGoogleToken(idToken);

//     let user: aw

//     return res.status(201).json({
//       email: user.email,
//       id: user.id,
//       message: MESSAGES.USER_INSERT_SUCCEEDED,
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// export const signin = async (
//   req: Request<unknown, unknown, UserType>,
//   res: Response,
// ): Promise<Response> => {
//   try {
//     const { email, password }: UserType = req.body;
//     return res.status(201);
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ message: "User not recognised" });
//   }
// };

// export const refresh = async (
//   req: Request<unknown, unknown, UserType>,
//   res: Response,
// ): Promise<Response> => {
//   try {

//   } catch (error) {
//     console.error(error);
//   }
// };
