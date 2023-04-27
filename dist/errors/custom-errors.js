import { HttpStatusCode } from "../types/index.js";
export class CustomError extends Error {
    constructor(type, status = HttpStatusCode.INTERNAL_SERVER_ERROR, title, message, details) {
        super(message);
        this.type = type;
        this.status = status;
        this.title = title;
        this.message = message;
        this.details = details;
    }
}
export class BadInputError extends CustomError {
    constructor(message, details) {
        super("BadInputError", HttpStatusCode.BAD_REQUEST, "Your request parameters didn't validate", message, details);
    }
}
export class JWTError extends CustomError {
    constructor(title, message) {
        super("JWTError", HttpStatusCode.UNAUTHORIZED, title, message);
    }
}
