import { z } from "zod";
export declare const app: z.ZodObject<{
    port: z.ZodNumber;
    privateKey: z.ZodString;
    privateKeyEmail: z.ZodString;
    origin: z.ZodString;
    email: z.ZodObject<{
        user: z.ZodString;
        password: z.ZodString;
        host: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        user: string;
        password: string;
        host: string;
    }, {
        user: string;
        password: string;
        host: string;
    }>;
    database: z.ZodObject<{
        host: z.ZodString;
        port: z.ZodNumber;
        name: z.ZodString;
        user: z.ZodString;
        password: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        port: number;
        user: string;
        password: string;
        host: string;
        name: string;
    }, {
        port: number;
        user: string;
        password: string;
        host: string;
        name: string;
    }>;
    mikroOrmConfig: z.ZodObject<{
        type: z.ZodString;
        entities: z.ZodArray<z.ZodString, "many">;
        entitiesTs: z.ZodArray<z.ZodString, "many">;
        migrations: z.ZodObject<{
            tableName: z.ZodString;
            path: z.ZodString;
            pathTs: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            path: string;
            tableName: string;
            pathTs: string;
        }, {
            path: string;
            tableName: string;
            pathTs: string;
        }>;
        seeder: z.ZodObject<{
            defaultSeeder: z.ZodString;
            path: z.ZodString;
            pathTs: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            path: string;
            pathTs: string;
            defaultSeeder: string;
        }, {
            path: string;
            pathTs: string;
            defaultSeeder: string;
        }>;
    }, "strip", z.ZodTypeAny, {
        type: string;
        entities: string[];
        entitiesTs: string[];
        migrations: {
            path: string;
            tableName: string;
            pathTs: string;
        };
        seeder: {
            path: string;
            pathTs: string;
            defaultSeeder: string;
        };
    }, {
        type: string;
        entities: string[];
        entitiesTs: string[];
        migrations: {
            path: string;
            tableName: string;
            pathTs: string;
        };
        seeder: {
            path: string;
            pathTs: string;
            defaultSeeder: string;
        };
    }>;
}, "strip", z.ZodTypeAny, {
    port: number;
    privateKey: string;
    privateKeyEmail: string;
    origin: string;
    email: {
        user: string;
        password: string;
        host: string;
    };
    database: {
        port: number;
        user: string;
        password: string;
        host: string;
        name: string;
    };
    mikroOrmConfig: {
        type: string;
        entities: string[];
        entitiesTs: string[];
        migrations: {
            path: string;
            tableName: string;
            pathTs: string;
        };
        seeder: {
            path: string;
            pathTs: string;
            defaultSeeder: string;
        };
    };
}, {
    port: number;
    privateKey: string;
    privateKeyEmail: string;
    origin: string;
    email: {
        user: string;
        password: string;
        host: string;
    };
    database: {
        port: number;
        user: string;
        password: string;
        host: string;
        name: string;
    };
    mikroOrmConfig: {
        type: string;
        entities: string[];
        entitiesTs: string[];
        migrations: {
            path: string;
            tableName: string;
            pathTs: string;
        };
        seeder: {
            path: string;
            pathTs: string;
            defaultSeeder: string;
        };
    };
}>;
