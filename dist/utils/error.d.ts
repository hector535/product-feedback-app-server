import { RequestHandler } from "express";
import { ZodError } from "zod";
import { ErrorDetail } from "../types/error.js";
export declare const tryCatch: (fnc: RequestHandler) => RequestHandler;
export declare const formatZodErrorIssues: (error: ZodError) => ErrorDetail[];
