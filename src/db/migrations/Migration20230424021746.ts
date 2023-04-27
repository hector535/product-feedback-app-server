import { Migration } from '@mikro-orm/migrations';

export class Migration20230424021746 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "category" ("id" serial primary key, "name" varchar(255) not null, "created_at" timestamptz(0) not null default now());');

    this.addSql('create table "feedback_status" ("id" serial primary key, "name" varchar(255) not null, "created_at" timestamptz(0) not null default now());');

    this.addSql('create table "user" ("id" serial primary key, "img" varchar(255) not null, "name" varchar(255) not null, "username" varchar(255) not null, "email" varchar(255) not null, "password" varchar(255) not null, "activated" boolean not null default false, "created_at" timestamptz(0) not null default now());');
    this.addSql('alter table "user" add constraint "user_name_unique" unique ("name");');
    this.addSql('alter table "user" add constraint "user_username_unique" unique ("username");');
    this.addSql('alter table "user" add constraint "user_email_unique" unique ("email");');

    this.addSql('create table "feedback" ("id" serial primary key, "title" varchar(255) not null, "content" varchar(255) not null, "enabled" boolean not null default true, "created_at" timestamptz(0) not null default now(), "updated_at" timestamptz(0) not null default now(), "author_id" int not null, "status_id" int not null default 1, "category_id" int not null);');

    this.addSql('create table "upvote" ("id" serial primary key, "feedback_id" int not null, "upvoter_id" int not null, "created_at" timestamptz(0) not null default now());');
    this.addSql('alter table "upvote" add constraint "upvote_feedback_id_upvoter_id_unique" unique ("feedback_id", "upvoter_id");');

    this.addSql('create table "comment" ("id" serial primary key, "content" varchar(255) not null, "enabled" boolean not null default true, "feedback_id" int not null, "commentator_id" int not null, "replying_to_id" int null, "created_at" timestamptz(0) not null default now(), "updated_at" timestamptz(0) not null default now());');

    this.addSql('alter table "feedback" add constraint "feedback_author_id_foreign" foreign key ("author_id") references "user" ("id") on update cascade;');
    this.addSql('alter table "feedback" add constraint "feedback_status_id_foreign" foreign key ("status_id") references "feedback_status" ("id") on update cascade;');
    this.addSql('alter table "feedback" add constraint "feedback_category_id_foreign" foreign key ("category_id") references "category" ("id") on update cascade;');

    this.addSql('alter table "upvote" add constraint "upvote_feedback_id_foreign" foreign key ("feedback_id") references "feedback" ("id") on update cascade;');
    this.addSql('alter table "upvote" add constraint "upvote_upvoter_id_foreign" foreign key ("upvoter_id") references "user" ("id") on update cascade;');

    this.addSql('alter table "comment" add constraint "comment_feedback_id_foreign" foreign key ("feedback_id") references "feedback" ("id") on update cascade;');
    this.addSql('alter table "comment" add constraint "comment_commentator_id_foreign" foreign key ("commentator_id") references "user" ("id") on update cascade;');
    this.addSql('alter table "comment" add constraint "comment_replying_to_id_foreign" foreign key ("replying_to_id") references "comment" ("id") on update cascade on delete set null;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "feedback" drop constraint "feedback_category_id_foreign";');

    this.addSql('alter table "feedback" drop constraint "feedback_status_id_foreign";');

    this.addSql('alter table "feedback" drop constraint "feedback_author_id_foreign";');

    this.addSql('alter table "upvote" drop constraint "upvote_upvoter_id_foreign";');

    this.addSql('alter table "comment" drop constraint "comment_commentator_id_foreign";');

    this.addSql('alter table "upvote" drop constraint "upvote_feedback_id_foreign";');

    this.addSql('alter table "comment" drop constraint "comment_feedback_id_foreign";');

    this.addSql('alter table "comment" drop constraint "comment_replying_to_id_foreign";');

    this.addSql('drop table if exists "category" cascade;');

    this.addSql('drop table if exists "feedback_status" cascade;');

    this.addSql('drop table if exists "user" cascade;');

    this.addSql('drop table if exists "feedback" cascade;');

    this.addSql('drop table if exists "upvote" cascade;');

    this.addSql('drop table if exists "comment" cascade;');
  }

}
