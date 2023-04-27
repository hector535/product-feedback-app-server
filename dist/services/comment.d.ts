import { AddCommentParams, EditCommentParams, RemoveCommentParams } from "../types/index.js";
import { Comment } from "../db/entities/index.js";
export declare const getCommentServices: () => {
    add: ({ content, commentator, feedback, replyingTo, }: AddCommentParams) => Promise<Comment>;
    edit: ({ id, content, commentator, }: EditCommentParams) => Promise<Comment>;
    remove: ({ id, commentator, }: RemoveCommentParams) => Promise<void>;
};
