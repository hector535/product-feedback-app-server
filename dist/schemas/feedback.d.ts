import { z } from "zod";
export declare const title: z.ZodString;
export declare const content: z.ZodEffects<z.ZodString, string, string>;
export declare const limit: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
export declare const offset: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
export declare const status: z.ZodDefault<z.ZodEnum<["all", "suggestion", "planned", "in-progress", "live"]>>;
export declare const getAll: z.ZodObject<{
    query: z.ZodObject<{
        limit: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
        offset: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
        status: z.ZodDefault<z.ZodEnum<["all", "suggestion", "planned", "in-progress", "live"]>>;
    }, "strip", z.ZodTypeAny, {
        status: "all" | "suggestion" | "planned" | "in-progress" | "live";
        limit: number;
        offset: number;
    }, {
        limit?: number | undefined;
        offset?: number | undefined;
        status?: "all" | "suggestion" | "planned" | "in-progress" | "live" | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    query: {
        status: "all" | "suggestion" | "planned" | "in-progress" | "live";
        limit: number;
        offset: number;
    };
}, {
    query: {
        limit?: number | undefined;
        offset?: number | undefined;
        status?: "all" | "suggestion" | "planned" | "in-progress" | "live" | undefined;
    };
}>;
export declare const getComments: z.ZodObject<{
    params: z.ZodObject<{
        id: z.ZodNumber;
        commentId: z.ZodDefault<z.ZodNullable<z.ZodOptional<z.ZodNumber>>>;
    }, "strip", z.ZodTypeAny, {
        id: number;
        commentId: number | null;
    }, {
        id: number;
        commentId?: number | null | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    params: {
        id: number;
        commentId: number | null;
    };
}, {
    params: {
        id: number;
        commentId?: number | null | undefined;
    };
}>;
export declare const add: z.ZodObject<{
    body: z.ZodObject<{
        title: z.ZodString;
        content: z.ZodEffects<z.ZodString, string, string>;
        category: z.ZodObject<{
            id: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            id: number;
        }, {
            id: number;
        }>;
    }, "strip", z.ZodTypeAny, {
        title: string;
        content: string;
        category: {
            id: number;
        };
    }, {
        title: string;
        content: string;
        category: {
            id: number;
        };
    }>;
}, "strip", z.ZodTypeAny, {
    body: {
        title: string;
        content: string;
        category: {
            id: number;
        };
    };
}, {
    body: {
        title: string;
        content: string;
        category: {
            id: number;
        };
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
        title: z.ZodString;
        content: z.ZodEffects<z.ZodString, string, string>;
        category: z.ZodObject<{
            id: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            id: number;
        }, {
            id: number;
        }>;
        status: z.ZodObject<{
            id: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            id: number;
        }, {
            id: number;
        }>;
    }, "strip", z.ZodTypeAny, {
        status: {
            id: number;
        };
        title: string;
        content: string;
        category: {
            id: number;
        };
    }, {
        status: {
            id: number;
        };
        title: string;
        content: string;
        category: {
            id: number;
        };
    }>;
}, "strip", z.ZodTypeAny, {
    params: {
        id: number;
    };
    body: {
        status: {
            id: number;
        };
        title: string;
        content: string;
        category: {
            id: number;
        };
    };
}, {
    params: {
        id: number;
    };
    body: {
        status: {
            id: number;
        };
        title: string;
        content: string;
        category: {
            id: number;
        };
    };
}>;
export declare const countByStatus: z.ZodObject<{
    planned: z.ZodNumber;
    "in-progress": z.ZodNumber;
    live: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    planned: number;
    "in-progress": number;
    live: number;
}, {
    planned: number;
    "in-progress": number;
    live: number;
}>;
