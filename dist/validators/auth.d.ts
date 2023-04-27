import { Request } from "express";
export declare const validateJWT: (req: Request) => Promise<{
    uid: number;
}>;
