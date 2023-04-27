/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { Request } from "express";
import jwt from "jsonwebtoken";
import { Payload, getPayloadFromJWT } from "../utils/index.js";
import { JWTError } from "../errors/custom-errors.js";

const { JsonWebTokenError } = jwt;

export const validateJWT = async (req: Request): Promise<{ uid: number }> => {
  try {
    const { accessToken } = req.cookies;

    if (!accessToken) {
      throw new JWTError(
        "Access token is missing",
        "The access token is missing"
      );
    }

    return (await getPayloadFromJWT(accessToken)) as Payload;
  } catch (error) {
    if (error instanceof JsonWebTokenError) {
      throw new JWTError("Invalid JWT", error.message);
    }

    throw error;
  }
};
