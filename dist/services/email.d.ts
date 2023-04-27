import { User } from "../db/entities/index.js";
export declare const sendActivationEmail: (token: string, user: User) => Promise<void>;
export declare const sendResetPasswordEmail: (token: string, user: User) => Promise<void>;
