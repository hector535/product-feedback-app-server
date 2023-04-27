/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { RequestContext } from "@mikro-orm/core";
import { Comment, Feedback, User } from "../db/entities/index.js";
import { RETRIEVE_ENTITY_MANAGER_ERROR } from "../constants/index.js";
export const getCommentServices = () => {
    const em = RequestContext.getEntityManager();
    if (!em)
        throw new Error(RETRIEVE_ENTITY_MANAGER_ERROR);
    const add = async ({ content, commentator, feedback, replyingTo, }) => {
        const newDate = new Date();
        const newComment = em.create(Comment, {
            content,
            commentator: em.getReference(User, commentator.id),
            feedback: em.getReference(Feedback, feedback.id),
            replyingTo: replyingTo
                ? em.getReference(Comment, replyingTo.id)
                : undefined,
            createdAt: newDate,
            updatedAt: newDate,
            enabled: true,
        });
        await em.persistAndFlush(newComment);
        return newComment;
    };
    const edit = async ({ id, content, commentator, }) => {
        const commentToEdit = await em.findOneOrFail(Comment, {
            id,
            commentator: em.getReference(User, commentator.id),
        });
        commentToEdit.content = content;
        await em.flush();
        return commentToEdit;
    };
    const remove = async ({ id, commentator, }) => {
        const commentToDelete = await em.findOneOrFail(Comment, {
            id,
            commentator: em.getReference(User, commentator.id),
        });
        commentToDelete.enabled = false;
        await em.flush();
    };
    return { add, edit, remove };
};
