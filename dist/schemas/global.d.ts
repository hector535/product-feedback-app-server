import { z } from "zod";
export declare const id: z.ZodNumber;
export declare const paramsId: z.ZodObject<{
    params: z.ZodObject<{
        id: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        id: number;
    }, {
        id: number;
    }>;
}, "strip", z.ZodTypeAny, {
    params: {
        id: number;
    };
}, {
    params: {
        id: number;
    };
}>;
