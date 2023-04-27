import { commentSchema } from "../schemas/index.js";
import { getCommentServices } from "../services/comment.js";
import { HttpStatusCode } from "../types/index.js";
import { tryCatch } from "../utils/index.js";
import { validateJWT } from "../validators/auth.js";
import { zParser } from "../validators/z-parser.js";

export const add = tryCatch(async (req, res) => {
  const { uid } = await validateJWT(req);
  const {
    body: { content, feedback, replyingTo },
  } = await zParser(commentSchema.add, req);

  const commentService = getCommentServices();

  const newComment = await commentService.add({
    content,
    feedback,
    replyingTo,
    commentator: { id: uid },
  });

  res.json(newComment);
});

export const edit = tryCatch(async (req, res) => {
  const { uid } = await validateJWT(req);
  const {
    params: { id },
    body: { content },
  } = await zParser(commentSchema.edit, req);

  const commentService = getCommentServices();

  const editedComment = await commentService.edit({
    id,
    content,
    commentator: { id: uid },
  });

  res.json(editedComment);
});

export const remove = tryCatch(async (req, res) => {
  const { uid } = await validateJWT(req);
  const {
    params: { id },
  } = await zParser(commentSchema.remove, req);
  const commentService = getCommentServices();

  await commentService.remove({ id, commentator: { id: uid } });

  res.status(HttpStatusCode.NO_CONTENT).json();
});
