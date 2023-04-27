import type { EntityManager } from "@mikro-orm/core";
import { Seeder } from "@mikro-orm/seeder";
import { FeedbackStatus } from "../entities/index.js";

export class FeedbackStatusSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    await em.insertMany(FeedbackStatus, [
      { name: "Suggestion" },
      { name: "Planned" },
      { name: "In-Progress" },
      { name: "Live" },
    ]);
  }
}
