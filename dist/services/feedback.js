import { Category, Feedback, FeedbackStatus, Upvote, User, } from "../db/entities/index.js";
import { feedbackSchema } from "../schemas/index.js";
import { orm } from "../config/mikro-orm.config.js";
export const getFeedbackServices = () => {
    const getAll = async ({ uid, limit, status, offset, }) => {
        const conn = orm.em.getConnection();
        const res = await conn.execute(`
        select 
            f.id, 
            f.title, 
            f.content,
            f.enabled,
            json_build_object( 'id', c.id, 'name', c.name ) as "category", 
            json_build_object( 'id', fs.id, 'name', lower(fs.name) ) as "status",
            CAST((select count(u.id) from upvote as u where u.feedback_id = f.id) AS INTEGER) as "upvotes", 
            CAST((select count(c.id) from comment as c where c.feedback_id = f.id) AS INTEGER) as "commentCounter", 
            EXISTS (select 1 from upvote u where u.feedback_id = f.id and u.upvoter_id = ?) as "hasUpvoted" 
        from feedback as f 
        left join category as c on f.category_id = c.id 
        left join feedback_status as fs on f.status_id = fs.id 
        where   (case 
                    when exists (select NULL from feedback_status where lower(name) = ? )
                        then lower(fs.name) = ?
                        else fs.name is not NULL
                end)
        and f.enabled = true
        order by f.id desc
        limit ? offset ?
    `, [uid, status, status, limit, offset]);
        return [res, res.length];
    };
    const getByIdForPreview = async (id, uid) => {
        const conn = orm.em.getConnection();
        const rows = await conn.execute(`
        select 
            f.id,
            f.title, 
            f.content,
            f.enabled, 
            json_build_object( 'id', c.id, 'name', c.name ) as "category", 
            CAST((select count(u.id) from upvote as u where u.feedback_id = f.id) AS INTEGER) as "upvotes", 
            CAST((select count(c.id) from comment as c where c.feedback_id = f.id) AS INTEGER) as "commentCounter", 
            CAST((CASE WHEN f.author_id = ? THEN 1 ELSE 0 END) AS BOOLEAN) AS "canEdit",
            EXISTS (select 1 from upvote u where u.feedback_id = f.id and u.upvoter_id = ?) as "hasUpvoted"
        from feedback as f 
        left join category as c on f.category_id = c.id 
        where f.id = ?
        `, [uid, uid, id]);
        return rows[0];
    };
    const getComments = async (feedbackId, commentId) => {
        const conn = orm.em.getConnection();
        const rows = await conn.execute(`select * from f_comments(?, ?)`, [
            feedbackId,
            commentId,
        ]);
        return rows[0].comments;
    };
    const getByIdForEdit = async (id, uid) => {
        return await orm.em.findOneOrFail(Feedback, { id, author: orm.em.getReference(User, uid) }, {
            populate: ["category", "status"],
            fields: ["title", "content", "category.id", "status.id"],
        });
    };
    const getCountByStatus = async () => {
        const connection = orm.em.getConnection();
        const rows = await connection.execute(`
        select
            (select count(id) from feedback where status_id = 2) as "planned",
            (select count(id) from feedback where status_id = 3) as "in-progress",
            (select count(id) from feedback where status_id = 4) as "live"
    `);
        return feedbackSchema.countByStatus.parse(rows[0]);
    };
    const add = async ({ title, content, category, author, }) => {
        const newDate = new Date();
        const newFeedback = orm.em.create(Feedback, {
            title,
            content,
            enabled: true,
            createdAt: newDate,
            updatedAt: newDate,
            category: orm.em.getReference(Category, category.id),
            author: orm.em.getReference(User, author.id),
            status: orm.em.getReference(FeedbackStatus, 1),
        });
        await orm.em.persistAndFlush(newFeedback);
    };
    const edit = async ({ id, title, content, author, category, status, }) => {
        await orm.em.transactional(async (inner) => {
            const feedbackToEdit = await inner.findOneOrFail(Feedback, {
                id,
                author: inner.getReference(User, author.id),
            });
            feedbackToEdit.title = title;
            feedbackToEdit.content = content;
            feedbackToEdit.category = inner.getReference(Category, category.id);
            feedbackToEdit.status = inner.getReference(FeedbackStatus, status.id);
            await inner.flush();
        });
    };
    const remove = async (id, uid) => {
        await orm.em.transactional(async (inner) => {
            const feedbackToDelete = await inner.findOneOrFail(Feedback, {
                id,
                author: inner.getReference(User, uid),
            });
            feedbackToDelete.enabled = false;
            await inner.flush();
        });
    };
    const upvote = async (id, uid) => {
        await orm.em.transactional(async (inner) => {
            const upvote = await inner.findOne(Upvote, {
                feedback: inner.getReference(Feedback, id),
                upvoter: inner.getReference(User, uid),
            });
            if (upvote) {
                await inner.removeAndFlush(upvote);
                return;
            }
            const newUpvote = inner.create(Upvote, {
                feedback: inner.getReference(Feedback, id),
                upvoter: inner.getReference(User, uid),
                createdAt: new Date(),
            });
            await inner.persistAndFlush(newUpvote);
        });
    };
    return {
        getAll,
        getByIdForPreview,
        getComments,
        getByIdForEdit,
        getCountByStatus,
        add,
        edit,
        remove,
        upvote,
    };
};
