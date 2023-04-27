import { z } from "zod";
export declare const createStringSchema: ({ fieldName, min, max }: {
    fieldName: string;
    min: number;
    max: number;
}) => z.ZodString;
export declare const createPaginationSchema: ({ fieldName, gte, defaultValue, }: {
    fieldName: string;
    gte: number;
    defaultValue: number;
}) => z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
