import { RequestContext } from "@mikro-orm/core";
import {
  Category,
  Feedback,
  FeedbackStatus,
  Upvote,
  User,
} from "../db/entities/index.js";
import {
  AddParams,
  CountByStatusParams,
  EditParams,
  GetAllParams,
  GetByIdForPreviewReturn,
  GetCommentsReturn,
} from "../types/index.js";
import { feedbackSchema } from "../schemas/index.js";
import { RETRIEVE_ENTITY_MANAGER_ERROR } from "../constants/index.js";

export const getFeedbackServices = () => {
  const em = RequestContext.getEntityManager();

  if (!em) throw new Error(RETRIEVE_ENTITY_MANAGER_ERROR);

  const getAll = async ({
    uid,
    limit,
    status,
    offset,
  }: GetAllParams): Promise<[Feedback[], number]> => {
    const conn = em.getConnection();
    const res = await conn.execute(
      `
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
    `,
      [uid, status, status, limit, offset]
    );
    return [res, res.length];
  };

  const getByIdForPreview = async (
    id: number,
    uid: number
  ): Promise<GetByIdForPreviewReturn> => {
    const conn = em.getConnection();
    const rows = await conn.execute(
      `
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
        `,
      [uid, uid, id]
    );

    return rows[0];
  };

  const getComments = async (
    feedbackId: number,
    commentId: number | null
  ): Promise<GetCommentsReturn> => {
    const conn = em.getConnection();
    const rows = await conn.execute(`select * from f_comments(?, ?)`, [
      feedbackId,
      commentId,
    ]);

    return rows[0].comments;
  };

  const getByIdForEdit = async (id: number, uid: number): Promise<Feedback> => {
    return await em.findOneOrFail(
      Feedback,
      { id, author: em.getReference(User, uid) },
      {
        populate: ["category", "status"],
        fields: ["title", "content", "category.id", "status.id"],
      }
    );
  };

  const getCountByStatus = async (): Promise<CountByStatusParams> => {
    const connection = em.getConnection();
    const rows = await connection.execute(`
        select
            (select count(id) from feedback where status_id = 2) as "planned",
            (select count(id) from feedback where status_id = 3) as "in-progress",
            (select count(id) from feedback where status_id = 4) as "live"
    `);

    return feedbackSchema.countByStatus.parse(rows[0]);
  };

  const add = async ({
    title,
    content,
    category,
    author,
  }: AddParams): Promise<void> => {
    const newDate = new Date();
    const newFeedback = em.create(Feedback, {
      title,
      content,
      enabled: true,
      createdAt: newDate,
      updatedAt: newDate,
      category: em.getReference(Category, category.id),
      author: em.getReference(User, author.id),
      status: em.getReference(FeedbackStatus, 1),
    });

    await em.persistAndFlush(newFeedback);
  };

  const edit = async ({
    id,
    title,
    content,
    author,
    category,
    status,
  }: EditParams): Promise<void> => {
    const feedbackToEdit = await em.findOneOrFail(Feedback, {
      id,
      author: em.getReference(User, author.id),
    });

    feedbackToEdit.title = title;
    feedbackToEdit.content = content;
    feedbackToEdit.category = em.getReference(Category, category.id);
    feedbackToEdit.status = em.getReference(FeedbackStatus, status.id);

    await em.flush();
  };

  const remove = async (id: number, uid: number): Promise<void> => {
    const feedbackToDelete = await em.findOneOrFail(Feedback, {
      id,
      author: em.getReference(User, uid),
    });

    feedbackToDelete.enabled = false;

    await em.flush();
  };

  const upvote = async (id: number, uid: number): Promise<void> => {
    const upvote = await em.findOne(Upvote, {
      feedback: em.getReference(Feedback, id),
      upvoter: em.getReference(User, uid),
    });

    if (upvote) {
      await em.removeAndFlush(upvote);
      return;
    }

    const newUpvote = em.create(Upvote, {
      feedback: em.getReference(Feedback, id),
      upvoter: em.getReference(User, uid),
      createdAt: new Date(),
    });

    await em.persistAndFlush(newUpvote);
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
