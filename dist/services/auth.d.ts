import { User } from "../db/entities/index.js";
import { SignupParams } from "../types/index.js";
export declare const getAuthServices: () => {
    signup: (userProperties: SignupParams) => Promise<User>;
    getUserByEmail: (email: string) => Promise<User>;
    resetPassword: (email: string, password: string) => Promise<void>;
    validateCredentials: (email: string, password: string) => Promise<User>;
    activateEmail: (email: string) => Promise<void>;
};
