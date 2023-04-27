import { config } from "dotenv";
import { configSchema } from "../schemas/index.js";
import { formatZodErrorIssues } from "../utils/index.js";

config();

const configProperties = {
  port: process.env.PORT!,
  privateKey: process.env.PRIVATE_KEY!,
  privateKeyEmail: process.env.PRIVATE_KEY_EMAIL!,
  origin: process.env.ORIGIN!,
  email: {
    user: process.env.EMAIL_USER!,
    password: process.env.EMAIL_PASSWORD!,
    host: process.env.EMAIL_HOST!,
  },
  database: {
    host: process.env.DB_HOST!,
    port: process.env.DB_PORT!,
    name: process.env.DB_NAME!,
    user: process.env.DB_USER!,
    password: process.env.DB_PASSWORD!,
  },
  mikroOrmConfig: {
    type: process.env.MIKRO_ORM_TYPE!,
    entities: [process.env.MIKRO_ORM_ENTITIES!],
    entitiesTs: [process.env.MIKRO_ORM_ENTITIES_TS!],
    migrations: {
      tableName: process.env.MIKRO_ORM_MIGRATION_TABLE_NAME!,
      path: process.env.MIKRO_ORM_MIGRATION_PATH!,
      pathTs: process.env.MIKRO_ORM_MIGRATION_PATH_TS!,
    },
    seeder: {
      defaultSeeder: process.env.MIKRO_ORM_SEEDER_DEFAULT!,
      path: process.env.MIKRO_ORM_SEEDER_PATH!,
      pathTs: process.env.MIKRO_ORM_SEEDER_PATH_TS!,
    },
  },
};

const result = configSchema.app.safeParse(configProperties);

if (!result.success) {
  const issues = formatZodErrorIssues(result.error);

  console.error({
    message: "Invalid .env configuration",
    issues,
  });

  throw new Error("Invalid .env configuration.");
}

export const env = result.data;
