import { FeedbackStatus } from "../db/entities/index.js";
export declare const getStatusServices: () => {
    getAll: () => Promise<FeedbackStatus[]>;
};
