import { Rel } from "@mikro-orm/core";
import { User, Category, FeedbackStatus } from "./index.js";
export declare class Feedback {
    id: number;
    title: string;
    content: string;
    enabled: boolean;
    createdAt: Date;
    updatedAt: Date;
    author: Rel<User>;
    status: Rel<FeedbackStatus>;
    category: Rel<Category>;
}
