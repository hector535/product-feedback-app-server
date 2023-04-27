import {
  Entity,
  PrimaryKey,
  ManyToOne,
  Property,
  Rel,
  Unique,
} from "@mikro-orm/core";
import { User, Feedback } from "./index.js";

@Entity()
@Unique({ properties: ["feedback", "upvoter"] })
export class Upvote {
  @PrimaryKey()
  id: number;

  @ManyToOne()
  feedback: Rel<Feedback>;

  @ManyToOne()
  upvoter: Rel<User>;

  @Property({ defaultRaw: "now()" })
  createdAt = new Date();
}
