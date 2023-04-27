import { z } from "zod";

export const createStringSchema = ({ fieldName, min, max }: { fieldName: string; min: number; max: number }) => {
  return z
    .string({
      required_error: `${fieldName} is required`,
      invalid_type_error: `${fieldName} must be a string`,
    })
    .trim()
    .min(min, {
      message: min === 1 ? `${fieldName} cannot be empty` : `${fieldName} cannot have less than ${min} characters`,
    })
    .max(max, {
      message: `${fieldName} cannot have more than ${max} characters`,
    });
};

export const createPaginationSchema = ({
  fieldName,
  gte,
  defaultValue,
}: {
  fieldName: string;
  gte: number;
  defaultValue: number;
}) => {
  return z.coerce
    .number({
      invalid_type_error: `${fieldName} must be provided as a positive integer`,
    })
    .int({ message: `${fieldName} must be provided as a positive integer` })
    .gte(gte, { message: `${fieldName} must be a positive integer` })
    .optional()
    .default(defaultValue);
};
