import { CustomError, JWTError } from "../errors/custom-errors.js";
import { ACCESS_TOKEN_NAME } from "../constants/auth.js";
export const tryCatch = (fnc) => {
    return async (req, res, next) => {
        try {
            await fnc(req, res, next);
        }
        catch (error) {
            console.error(error);
            const isCustomError = error instanceof CustomError;
            if (isCustomError) {
                const jsonResp = {
                    type: error.type,
                    status: error.status,
                    title: error.title,
                    message: error.message,
                    details: error.details,
                };
                if (error instanceof JWTError) {
                    return res
                        .status(error.status)
                        .clearCookie(ACCESS_TOKEN_NAME)
                        .json(jsonResp);
                }
                return res.status(error.status).json(jsonResp);
            }
            res.status(500).json({
                type: "GenericError",
                title: "A problem has ocurred. Please try again later.",
                status: 500,
                details: null,
            });
        }
    };
};
export const formatZodErrorIssues = (error) => error.issues.map((issue) => ({
    property: issue.path.join("."),
    message: issue.message,
}));
