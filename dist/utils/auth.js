import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { env } from "../config/index.js";
import { photos } from "../constants/auth.js";
export const hashValue = async (value) => {
    const salt = await bcrypt.genSalt();
    return bcrypt.hash(value, salt);
};
export const createJWT = (payload) => {
    return new Promise((resolve, reject) => {
        jwt.sign(payload, env.privateKey, { expiresIn: "1h" }, (err, token) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(token);
            }
        });
    });
};
export const createEmailToken = (payload) => {
    return new Promise((resolve, reject) => {
        jwt.sign(payload, env.privateKeyEmail, { expiresIn: "1h" }, (err, token) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(token);
            }
        });
    });
};
export const getEmailFromToken = (token) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, env.privateKeyEmail, (err, payload) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(payload);
            }
        });
    });
};
export const getPayloadFromJWT = (token) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, env.privateKey, (err, payload) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(payload);
            }
        });
    });
};
export const pickRandomPhoto = () => {
    const numPhotos = photos.length;
    const randomIndex = Math.floor(Math.random() * numPhotos);
    return photos[randomIndex];
};
