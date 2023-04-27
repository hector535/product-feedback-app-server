/* eslint-disable @typescript-eslint/no-namespace */
import { z } from "zod";
import { authSchema } from "../schemas/index.js";

export type SignupParams = Omit<
  z.infer<typeof authSchema.signup.shape.body> & {
    img: string;
    activated: boolean;
  },
  "confirmPassword"
>;
