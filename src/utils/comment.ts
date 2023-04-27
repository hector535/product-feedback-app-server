import { z } from "zod";

export const createIdSchema = (propertyName: string) =>
  z.coerce
    .number({
      invalid_type_error: `${propertyName} must be a positive integer`,
    })
    .int({ message: `${propertyName} must be a positive integer` })
    .positive({ message: `${propertyName} must be a positive integer` });
