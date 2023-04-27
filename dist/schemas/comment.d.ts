import { z } from "zod";
export declare const add: z.ZodObject<{
    body: z.ZodObject<{
        content: z.ZodEffects<z.ZodString, string, string>;
        feedback: z.ZodObject<{
            id: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            id: number;
        }, {
            id: number;
        }>;
        replyingTo: z.ZodNullable<z.ZodObject<{
            id: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            id: number;
        }, {
            id: number;
        }>>;
    }, "strip", z.ZodTypeAny, {
        content: string;
        feedback: {
            id: number;
        };
        replyingTo: {
            id: number;
        } | null;
    }, {
        content: string;
        feedback: {
            id: number;
        };
        replyingTo: {
            id: number;
        } | null;
    }>;
}, "strip", z.ZodTypeAny, {
    body: {
        content: string;
        feedback: {
            id: number;
        };
        replyingTo: {
            id: number;
        } | null;
    };
}, {
    body: {
        content: string;
        feedback: {
            id: number;
        };
        replyingTo: {
            id: number;
        } | null;
    };
}>;
export declare const remove: z.ZodObject<{
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
export declare const edit: z.ZodObject<{
    params: z.ZodObject<{
        id: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        id: number;
    }, {
        id: number;
    }>;
    body: z.ZodObject<{
        content: z.ZodEffects<z.ZodString, string, string>;
    }, "strip", z.ZodTypeAny, {
        content: string;
    }, {
        content: string;
    }>;
}, "strip", z.ZodTypeAny, {
    params: {
        id: number;
    };
    body: {
        content: string;
    };
}, {
    params: {
        id: number;
    };
    body: {
        content: string;
    };
}>;
