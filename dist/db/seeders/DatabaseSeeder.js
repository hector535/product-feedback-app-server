import { Seeder } from "@mikro-orm/seeder";
import { CategorySeeder, FeedbackStatusSeeder, UserSeeder, FeedbackSeeder, CommentSeeder, } from "./index.js";
export class DatabaseSeeder extends Seeder {
    async run(em) {
        return this.call(em, [
            CategorySeeder,
            FeedbackStatusSeeder,
            UserSeeder,
            FeedbackSeeder,
            CommentSeeder,
        ]);
    }
}
