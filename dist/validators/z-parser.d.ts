import { Request } from "express";
import { z } from "zod";
export declare const zParser: <T extends z.AnyZodObject | z.ZodOptional<z.AnyZodObject>>(schema: T, req: Request) => Promise<z.TypeOf<T>>;
