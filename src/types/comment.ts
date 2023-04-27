/* eslint-disable @typescript-eslint/no-namespace */
import { z } from "zod";
import { commentSchema } from "../schemas/index.js";

export type AddCommentParams = z.infer<typeof commentSchema.add.shape.body> & {
  commentator: { id: number };
};
export type EditCommentParams = z.infer<
  typeof commentSchema.edit.shape.body
> & {
  id: number;
  commentator: { id: number };
};
export type RemoveCommentParams = { id: number; commentator: { id: number } };
