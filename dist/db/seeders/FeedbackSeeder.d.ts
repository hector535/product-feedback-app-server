import { EntityManager } from "@mikro-orm/postgresql";
import { Seeder } from "@mikro-orm/seeder";
export declare class FeedbackSeeder extends Seeder {
    run(em: EntityManager): Promise<void>;
}
