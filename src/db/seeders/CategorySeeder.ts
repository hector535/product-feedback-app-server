import type { EntityManager } from "@mikro-orm/core";
import { Seeder } from "@mikro-orm/seeder";
import { Category } from "../entities/index.js";

export class CategorySeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    await em.insertMany(Category, [
      { name: "UI" },
      { name: "UX" },
      { name: "Enhancement" },
      { name: "Bug" },
      { name: "Feature" },
    ]);
  }
}
