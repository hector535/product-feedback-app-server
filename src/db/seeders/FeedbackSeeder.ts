import { EntityManager } from "@mikro-orm/postgresql";
import { Seeder } from "@mikro-orm/seeder";
import { Category, Feedback, User } from "../entities/index.js";

export class FeedbackSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    await em.insertMany(Feedback, [
      {
        title: "Add tags for solutions",
        content: "Easier to search for solutions based on a specific stack.",
        author: em.getReference(User, 1),
        category: em.getReference(Category, 3),
      },
      {
        title: "Add a dark theme option",
        content:
          "It would help people with light sensitivities and who prefer dark mode.",
        author: em.getReference(User, 2),
        category: em.getReference(Category, 5),
      },
      {
        title: "Q&A within the challenge hubs",
        content: "Challenge-specific Q&A would make for easy reference.",
        author: em.getReference(User, 3),
        category: em.getReference(Category, 5),
      },
      {
        title: "Add image/video upload to feedback",
        content: "Images and screencasts can enhance comments on solutions.",
        author: em.getReference(User, 4),
        category: em.getReference(Category, 3),
      },
      {
        title: "Ability to follow others",
        content: "Stay updated on comments and solutions other people post.",
        author: em.getReference(User, 5),
        category: em.getReference(Category, 5),
      },
      {
        title: "Preview images not loading",
        content:
          "Challenge preview images are missing when you apply a filter.",
        author: em.getReference(User, 6),
        category: em.getReference(Category, 4),
      },
      {
        title: "More comprehensive reports",
        content:
          "It would be great to see a more detailed breakdown of solutions.",
        author: em.getReference(User, 7),
        category: em.getReference(Category, 5),
      },
      {
        title: "Learning paths",
        content:
          "Sequenced projects for different goals to help people improve.",
        author: em.getReference(User, 8),
        category: em.getReference(Category, 5),
      },
      {
        title: "One-click portfolio generation",
        content:
          "Add ability to create professional looking portfolio from profile.",
        author: em.getReference(User, 9),
        category: em.getReference(Category, 5),
      },
      {
        title: "Bookmark challenges",
        content: "Be able to bookmark challenges to take later on.",
        author: em.getReference(User, 10),
        category: em.getReference(Category, 5),
      },
      {
        title: "Animated solution screenshots",
        content:
          "Screenshots of solutions with animations don’t display correctly.",
        author: em.getReference(User, 11),
        category: em.getReference(Category, 4),
      },
      {
        title: "Add micro-interactions",
        content: "Small animations at specific points can add delight.",
        author: em.getReference(User, 12),
        category: em.getReference(Category, 3),
      },
    ]);
  }
}
