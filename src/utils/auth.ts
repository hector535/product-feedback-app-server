import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

import { env } from "../config/index.js";
import { photos } from "../constants/auth.js";

export type Payload = {
  uid: number;
};

export const hashValue = async (value: string): Promise<string> => {
  const salt = await bcrypt.genSalt();
  return bcrypt.hash(value, salt);
};

export const createJWT = (payload: Payload): Promise<string> => {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, env.privateKey, { expiresIn: "1h" }, (err, token) => {
      if (err) {
        reject(err);
      } else {
        resolve(token!);
      }
    });
  });
};

export const createEmailToken = (payload: {
  email: string;
}): Promise<string> => {
  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      env.privateKeyEmail,
      { expiresIn: "1h" },
      (err, token) => {
        if (err) {
          reject(err);
        } else {
          resolve(token!);
        }
      }
    );
  });
};

export const getEmailFromToken = (
  token: string
): Promise<{ email: string }> => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, env.privateKeyEmail, (err, payload) => {
      if (err) {
        reject(err);
      } else {
        resolve(payload as { email: string });
      }
    });
  });
};

export const getPayloadFromJWT = (token: string): Promise<Payload> => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, env.privateKey, (err, payload) => {
      if (err) {
        reject(err);
      } else {
        resolve(payload as Payload);
      }
    });
  });
};

export const pickRandomPhoto = (): string => {
  const numPhotos = photos.length;
  const randomIndex = Math.floor(Math.random() * numPhotos);

  return photos[randomIndex];
};
