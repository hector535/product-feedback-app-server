import { Entity, ManyToOne, PrimaryKey, Property, Rel } from "@mikro-orm/core";
import { User, Category, FeedbackStatus } from "./index.js";

@Entity()
export class Feedback {
  @PrimaryKey()
  id: number;

  @Property()
  title: string;

  @Property()
  content: string;

  @Property()
  enabled = true;

  @Property({ defaultRaw: "now()" })
  createdAt = new Date();

  @Property({ onUpdate: () => new Date(), defaultRaw: "now()" })
  updatedAt = new Date();

  @ManyToOne()
  author: Rel<User>;

  @ManyToOne({ default: 1 })
  status: Rel<FeedbackStatus>;

  @ManyToOne()
  category: Rel<Category>;
}
