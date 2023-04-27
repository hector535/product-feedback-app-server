import validator from "validator";
import { z } from "zod";
import { globalSchema } from "./index.js";
import { createPaginationSchema, createStringSchema } from "../utils/index.js";

const { id } = globalSchema;

export const title = createStringSchema({
  fieldName: "title",
  min: 1,
  max: 255,
});
export const content = createStringSchema({
  fieldName: "content",
  min: 1,
  max: 255,
}).refine((val) => validator.escape(val));

export const limit = createPaginationSchema({
  fieldName: "limit",
  gte: 0,
  defaultValue: 10,
});
export const offset = createPaginationSchema({
  fieldName: "offset",
  gte: 0,
  defaultValue: 0,
});

export const status = z
  .enum(["all", "suggestion", "planned", "in-progress", "live"], {
    required_error: "status is required",
    invalid_type_error: "status must be a string",
  })
  .default("all");

export const getAll = z.object({
  query: z.object({
    limit,
    offset,
    status,
  }),
});

export const getComments = z.object({
  params: z.object({
    id,
    commentId: id.optional().nullable().default(null),
  }),
});

export const add = z.object({
  body: z.object({
    title,
    content,
    category: z.object({
      id,
    }),
  }),
});

export const edit = z.object({
  params: z.object({ id }),
  body: z.object({
    title,
    content,
    category: z.object({
      id,
    }),
    status: z.object({
      id,
    }),
  }),
});

export const countByStatus = z.object({
  planned: z.coerce.number(),
  "in-progress": z.coerce.number(),
  live: z.coerce.number(),
});
