import jwt from "jsonwebtoken";
import { getPayloadFromJWT } from "../utils/index.js";
import { JWTError } from "../errors/custom-errors.js";
const { JsonWebTokenError } = jwt;
export const validateJWT = async (req) => {
    try {
        const { accessToken } = req.cookies;
        if (!accessToken) {
            throw new JWTError("Access token is missing", "The access token is missing");
        }
        return (await getPayloadFromJWT(accessToken));
    }
    catch (error) {
        if (error instanceof JsonWebTokenError) {
            throw new JWTError("Invalid JWT", error.message);
        }
        throw error;
    }
};
