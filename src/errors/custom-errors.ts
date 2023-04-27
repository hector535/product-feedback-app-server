import { ErrorDetail, HttpStatusCode } from "../types/index.js";

export class CustomError extends Error {
  constructor(
    public type: string,
    public status: HttpStatusCode = HttpStatusCode.INTERNAL_SERVER_ERROR,
    public title: string,
    public message: string,
    public details?: ErrorDetail[]
  ) {
    super(message);
  }
}

export class BadInputError extends CustomError {
  constructor(message: string, details?: ErrorDetail[]) {
    super(
      "BadInputError",
      HttpStatusCode.BAD_REQUEST,
      "Your request parameters didn't validate",
      message,
      details
    );
  }
}

export class JWTError extends CustomError {
  constructor(title: string, message: string) {
    super("JWTError", HttpStatusCode.UNAUTHORIZED, title, message);
  }
}
