import { Request } from "express";
import { z, AnyZodObject, ZodOptional, ZodError } from "zod";
import { BadInputError } from "../errors/custom-errors.js";
import { formatZodErrorIssues } from "../utils/index.js";

export const zParser = async <
  T extends AnyZodObject | ZodOptional<AnyZodObject>
>(
  schema: T,
  req: Request
): Promise<z.infer<T>> => {
  try {
    return await schema.parseAsync(req);
  } catch (error) {
    if (error instanceof ZodError) {
      const details = formatZodErrorIssues(error);
      const message = details
        .map((e) => `field ${e.property} = ${e.message}`)
        .join("\n");
      throw new BadInputError(message, details);
    }

    throw error;
  }
};
