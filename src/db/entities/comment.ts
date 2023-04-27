import { Entity, ManyToOne, PrimaryKey, Property, Rel } from "@mikro-orm/core";
import { Feedback, User } from "./index.js";

@Entity()
export class Comment {
  @PrimaryKey()
  id: number;

  @Property()
  content: string;

  @Property()
  enabled = true;

  @ManyToOne()
  feedback: Rel<Feedback>;

  @ManyToOne()
  commentator: Rel<User>;

  @ManyToOne()
  replyingTo?: Rel<Comment>;

  @Property({ defaultRaw: "now()" })
  createdAt = new Date();

  @Property({ onUpdate: () => new Date(), defaultRaw: "now()" })
  updatedAt = new Date();

  constructor(
    content: string,
    feedback: Feedback,
    commentator: User,
    replyingTo?: Comment
  ) {
    this.content = content;
    this.feedback = feedback;
    this.commentator = commentator;
    this.replyingTo = replyingTo;
  }
}
