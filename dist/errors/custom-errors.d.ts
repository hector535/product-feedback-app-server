import { ErrorDetail, HttpStatusCode } from "../types/index.js";
export declare class CustomError extends Error {
    type: string;
    status: HttpStatusCode;
    title: string;
    message: string;
    details?: ErrorDetail[] | undefined;
    constructor(type: string, status: HttpStatusCode, title: string, message: string, details?: ErrorDetail[] | undefined);
}
export declare class BadInputError extends CustomError {
    constructor(message: string, details?: ErrorDetail[]);
}
export declare class JWTError extends CustomError {
    constructor(title: string, message: string);
}
