import { Rel } from "@mikro-orm/core";
import { Feedback, User } from "./index.js";
export declare class Comment {
    id: number;
    content: string;
    enabled: boolean;
    feedback: Rel<Feedback>;
    commentator: Rel<User>;
    replyingTo?: Rel<Comment>;
    createdAt: Date;
    updatedAt: Date;
    constructor(content: string, feedback: Feedback, commentator: User, replyingTo?: Comment);
}
