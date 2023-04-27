export declare const env: {
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
};
