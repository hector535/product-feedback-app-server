import { tryCatch } from "../utils/index.js";
import { getFeedbackServices } from "../services/index.js";
import { validateJWT, zParser } from "../validators/index.js";
import { feedbackSchema, globalSchema } from "../schemas/index.js";
import { HttpStatusCode } from "../types/index.js";

export const getAll = tryCatch(async (req, res) => {
  const { uid } = await validateJWT(req);
  const {
    query: { limit, offset, status },
  } = await zParser(feedbackSchema.getAll, req);

  const feedbackService = getFeedbackServices();

  const [feedbacks, count] = await feedbackService.getAll({
    limit,
    offset,
    status,
    uid,
  });

  res.json({ total: count, data: feedbacks });
});

export const getByIdForPreview = tryCatch(async (req, res) => {
  const { uid } = await validateJWT(req);
  const {
    params: { id },
  } = await zParser(globalSchema.paramsId, req);

  const feedbackService = getFeedbackServices();

  const feedback = await feedbackService.getByIdForPreview(id, uid);

  return res.json(feedback);
});

export const getComments = tryCatch(async (req, res) => {
  await validateJWT(req);
  const {
    params: { id, commentId },
  } = await zParser(feedbackSchema.getComments, req);

  const feedbackService = getFeedbackServices();

  const result = await feedbackService.getComments(id, commentId);

  res.json(result);
});

export const getByIdForEdit = tryCatch(async (req, res) => {
  const { uid } = await validateJWT(req);
  const {
    params: { id },
  } = await zParser(globalSchema.paramsId, req);

  const feedbackService = getFeedbackServices();

  const feedback = await feedbackService.getByIdForEdit(id, uid);

  return res.json(feedback);
});

export const countByStatus = tryCatch(async (req, res) => {
  await validateJWT(req);

  const feedbackService = getFeedbackServices();
  const result = await feedbackService.getCountByStatus();

  res.json(result);
});

export const add = tryCatch(async (req, res) => {
  const { uid } = await validateJWT(req);
  const {
    body: { title, content, category },
  } = await zParser(feedbackSchema.add, req);

  const feedbackService = getFeedbackServices();

  await feedbackService.add({ title, content, category, author: { id: uid } });

  res.status(HttpStatusCode.CREATED).json();
});

export const edit = tryCatch(async (req, res) => {
  const { uid } = await validateJWT(req);
  const {
    params: { id },
    body: { title, content, category, status },
  } = await zParser(feedbackSchema.edit, req);

  const feedbackService = getFeedbackServices();

  await feedbackService.edit({
    id,
    title,
    content,
    category,
    status,
    author: { id: uid },
  });

  res.status(HttpStatusCode.NO_CONTENT).json();
});

export const remove = tryCatch(async (req, res) => {
  const { uid } = await validateJWT(req);
  const {
    params: { id },
  } = await zParser(globalSchema.paramsId, req);

  const feedbackService = getFeedbackServices();

  await feedbackService.remove(id, uid);

  res.status(HttpStatusCode.NO_CONTENT).json();
});

export const upvote = tryCatch(async (req, res) => {
  const { uid } = await validateJWT(req);
  const {
    params: { id },
  } = await zParser(globalSchema.paramsId, req);

  const feedbackService = getFeedbackServices();

  await feedbackService.upvote(id, uid);

  res.status(HttpStatusCode.NO_CONTENT).json();
});
