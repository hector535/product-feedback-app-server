import { Rel } from "@mikro-orm/core";
import { User, Feedback } from "./index.js";
export declare class Upvote {
    id: number;
    feedback: Rel<Feedback>;
    upvoter: Rel<User>;
    createdAt: Date;
}
