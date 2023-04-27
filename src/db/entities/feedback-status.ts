import { Entity, PrimaryKey, Property } from "@mikro-orm/core";

@Entity()
export class FeedbackStatus {
  @PrimaryKey()
  id: number;

  @Property()
  name: string;

  @Property({ defaultRaw: "now()" })
  createdAt = new Date();
}
