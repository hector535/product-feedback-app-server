import { LoadStrategy } from "@mikro-orm/core";
import { TsMorphMetadataProvider } from "@mikro-orm/reflection";
import { env } from "./index.js";
const { database, mikroOrmConfig } = env;
const { migrations, seeder, type, entities, entitiesTs } = mikroOrmConfig;
export default {
    migrations,
    seeder,
    type,
    entities,
    entitiesTs,
    host: database.host,
    dbName: database.name,
    user: database.user,
    password: database.password,
    port: database.port,
    debug: false,
    metadataProvider: TsMorphMetadataProvider,
    loadStrategy: LoadStrategy.JOINED,
};