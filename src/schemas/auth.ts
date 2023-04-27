import { z } from "zod";
import { createStringSchema } from "../utils/index.js";

const name = createStringSchema({ fieldName: "name", min: 3, max: 255 });
const username = createStringSchema({
  fieldName: "username",
  min: 3,
  max: 255,
});
const password = createStringSchema({
  fieldName: "password",
  min: 6,
  max: 150,
});
const confirmPassword = createStringSchema({
  fieldName: "confirmPassword",
  min: 6,
  max: 150,
});
const email = z
  .string({
    required_error: "email is required",
    invalid_type_error: "email must be a string",
  })
  .trim()
  .toLowerCase()
  .email()
  .max(255, { message: "email must have a maximum length of 255 characters " });

const token = z.string({
  required_error: "Token is required",
  invalid_type_error: "Token must be a string",
});

export const signin = z.object({ body: z.object({ email, password }) });
export const signup = z.object({
  body: z
    .object({ name, username, email, password, confirmPassword })
    .refine((data) => data.password === data.confirmPassword, {
      path: ["confirmPassword"],
      message: "Password don't match",
    }),
});
export const forgot = z.object({
  body: z.object({
    email,
  }),
});

export const reset = z.object({
  body: z
    .object({
      token,
      password,
      confirmPassword,
    })
    .refine((data) => data.password === data.confirmPassword, {
      path: ["confirmPassword"],
      message: "Password don't match",
    }),
});

export const activate = z.object({
  body: z.object({
    token,
  }),
});
