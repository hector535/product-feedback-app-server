import { Entity, PrimaryKey, Property, Unique } from "@mikro-orm/core";

@Entity()
export class User {
  @PrimaryKey()
  id: number;

  @Property()
  img: string;

  @Property()
  @Unique()
  name: string;

  @Property()
  @Unique()
  username: string;

  @Property()
  @Unique()
  email: string;

  @Property()
  password: string;

  @Property()
  activated = false;

  @Property({ defaultRaw: "now()" })
  createdAt = new Date();
}
