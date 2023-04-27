import { z } from "zod";
import validator from "validator";
import { globalSchema } from "./index.js";
import { createStringSchema } from "../utils/index.js";
const { id } = globalSchema;
const content = createStringSchema({
    fieldName: "content",
    min: 1,
    max: 255,
}).refine((val) => validator.escape(val));
export const add = z.object({
    body: z.object({
        content,
        feedback: z.object({ id }),
        replyingTo: z.object({ id }).nullable(),
    }),
});
export const remove = z.object({
    params: z.object({ id }),
});
export const edit = z.object({
    params: z.object({ id }),
    body: z.object({ content }),
});
