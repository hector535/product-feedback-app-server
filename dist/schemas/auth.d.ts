import { z } from "zod";
export declare const signin: z.ZodObject<{
    body: z.ZodObject<{
        email: z.ZodString;
        password: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        password: string;
        email: string;
    }, {
        password: string;
        email: string;
    }>;
}, "strip", z.ZodTypeAny, {
    body: {
        password: string;
        email: string;
    };
}, {
    body: {
        password: string;
        email: string;
    };
}>;
export declare const signup: z.ZodObject<{
    body: z.ZodEffects<z.ZodObject<{
        name: z.ZodString;
        username: z.ZodString;
        email: z.ZodString;
        password: z.ZodString;
        confirmPassword: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        password: string;
        email: string;
        name: string;
        username: string;
        confirmPassword: string;
    }, {
        password: string;
        email: string;
        name: string;
        username: string;
        confirmPassword: string;
    }>, {
        password: string;
        email: string;
        name: string;
        username: string;
        confirmPassword: string;
    }, {
        password: string;
        email: string;
        name: string;
        username: string;
        confirmPassword: string;
    }>;
}, "strip", z.ZodTypeAny, {
    body: {
        password: string;
        email: string;
        name: string;
        username: string;
        confirmPassword: string;
    };
}, {
    body: {
        password: string;
        email: string;
        name: string;
        username: string;
        confirmPassword: string;
    };
}>;
export declare const forgot: z.ZodObject<{
    body: z.ZodObject<{
        email: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        email: string;
    }, {
        email: string;
    }>;
}, "strip", z.ZodTypeAny, {
    body: {
        email: string;
    };
}, {
    body: {
        email: string;
    };
}>;
export declare const reset: z.ZodObject<{
    body: z.ZodEffects<z.ZodObject<{
        token: z.ZodString;
        password: z.ZodString;
        confirmPassword: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        password: string;
        confirmPassword: string;
        token: string;
    }, {
        password: string;
        confirmPassword: string;
        token: string;
    }>, {
        password: string;
        confirmPassword: string;
        token: string;
    }, {
        password: string;
        confirmPassword: string;
        token: string;
    }>;
}, "strip", z.ZodTypeAny, {
    body: {
        password: string;
        confirmPassword: string;
        token: string;
    };
}, {
    body: {
        password: string;
        confirmPassword: string;
        token: string;
    };
}>;
export declare const activate: z.ZodObject<{
    body: z.ZodObject<{
        token: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        token: string;
    }, {
        token: string;
    }>;
}, "strip", z.ZodTypeAny, {
    body: {
        token: string;
    };
}, {
    body: {
        token: string;
    };
}>;
