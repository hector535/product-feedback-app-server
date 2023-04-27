import type { EntityManager } from "@mikro-orm/core";
import { Seeder } from "@mikro-orm/seeder";
export declare class UserSeeder extends Seeder {
    run(em: EntityManager): Promise<void>;
}
