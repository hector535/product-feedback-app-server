import { Comment, Feedback, User } from "../db/entities/index.js";
import { orm } from "../config/mikro-orm.config.js";
export const getCommentServices = () => {
    const add = async ({ content, commentator, feedback, replyingTo, }) => {
        const newDate = new Date();
        const newComment = orm.em.create(Comment, {
            content,
            commentator: orm.em.getReference(User, commentator.id),
            feedback: orm.em.getReference(Feedback, feedback.id),
            replyingTo: replyingTo
                ? orm.em.getReference(Comment, replyingTo.id)
                : undefined,
            createdAt: newDate,
            updatedAt: newDate,
            enabled: true,
        });
        await orm.em.persistAndFlush(newComment);
        return newComment;
    };
    const edit = async ({ id, content, commentator, }) => {
        return await orm.em.transactional(async (inner) => {
            const commentToEdit = await inner.findOneOrFail(Comment, {
                id,
                commentator: inner.getReference(User, commentator.id),
            });
            commentToEdit.content = content;
            await inner.flush();
            return commentToEdit;
        });
    };
    const remove = async ({ id, commentator, }) => {
        await orm.em.transactional(async (inner) => {
            const commentToDelete = await inner.findOneOrFail(Comment, {
                id,
                commentator: inner.getReference(User, commentator.id),
            });
            commentToDelete.enabled = false;
            await inner.flush();
        });
    };
    return { add, edit, remove };
};
