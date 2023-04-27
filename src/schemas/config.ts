import { z } from "zod";
import { createStringSchema } from "../utils/index.js";

const email = z.object({
  user: createStringSchema({ fieldName: "EMAIL_USER", min: 1, max: 100 }),
  password: createStringSchema({
    fieldName: "EMAIL_PASSWORD",
    min: 1,
    max: 100,
  }),
  host: createStringSchema({ fieldName: "EMAIL_HOST", min: 1, max: 100 }),
});

const database = z.object({
  host: createStringSchema({ fieldName: "HOST", min: 1, max: 100 }),
  port: z.coerce
    .number({ invalid_type_error: "port must be a positive integer" })
    .int({ message: "port must be a positive integer" })
    .positive({ message: "port must be a positive integer" }),
  name: createStringSchema({ fieldName: "NAME", min: 1, max: 100 }),
  user: createStringSchema({ fieldName: "USER", min: 1, max: 100 }),
  password: createStringSchema({ fieldName: "PASSWORD", min: 1, max: 255 }),
});

const mikroOrmConfig = z.object({
  type: createStringSchema({ fieldName: "TYPE", min: 1, max: 100 }),
  entities: z.array(
    createStringSchema({ fieldName: "ENTITIES", min: 1, max: 100 })
  ),
  entitiesTs: z.array(
    createStringSchema({
      fieldName: "ENTITIES_TS",
      min: 1,
      max: 100,
    })
  ),
  migrations: z.object({
    tableName: createStringSchema({
      fieldName: "TABLE_NAME",
      min: 1,
      max: 100,
    }),
    path: createStringSchema({ fieldName: "PATH", min: 1, max: 100 }),
    pathTs: createStringSchema({ fieldName: "PATH_TS", min: 1, max: 100 }),
  }),
  seeder: z.object({
    defaultSeeder: createStringSchema({
      fieldName: "SEEDER_DEFAULT",
      min: 1,
      max: 100,
    }),
    path: createStringSchema({ fieldName: "SEEDER_PATH", min: 1, max: 100 }),
    pathTs: createStringSchema({
      fieldName: "SEEDER_PATH_TS",
      min: 1,
      max: 100,
    }),
  }),
});

export const app = z.object({
  port: z.coerce
    .number({ invalid_type_error: "port must be a positive integer" })
    .int({ message: "port must be a positive integer" })
    .positive({ message: "port must be a positive integer" }),
  privateKey: createStringSchema({
    fieldName: "PRIVATE_KEY",
    min: 1,
    max: 100,
  }),
  privateKeyEmail: createStringSchema({
    fieldName: "PRIVATE_KEY_EMAIL",
    min: 1,
    max: 100,
  }),
  origin: createStringSchema({ fieldName: "ORIGIN", min: 1, max: 100 }),
  email,
  database,
  mikroOrmConfig,
});
