import type { EntityManager } from "@mikro-orm/core";
import { Seeder } from "@mikro-orm/seeder";
import { User } from "../entities/index.js";

export class UserSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    await em.insertMany(User, [
      {
        img: "suzanne.jpg",
        email: "test@gmail.com",
        name: "Suzanne Chang",
        username: "upbeat1811",
        password: "123456",
      },
      {
        img: "thomas.jpg",
        email: "test2@gmail.com",
        name: "Thomas Hood",
        username: "brawnybrave",
        password: "123456",
      },
      {
        img: "elijah.jpg",
        email: "test3@gmail.com",
        name: "Elijah Moss",
        username: "hexagon.bestagon",
        password: "123456",
      },
      {
        img: "james.jpg",
        email: "test4@gmail.com",
        name: "James Skinner",
        username: "hummingbird1",
        password: "123456",
      },
      {
        img: "anne.jpg",
        email: "test5@gmail.com",
        name: "Anne Valentine",
        username: "annev1990",
        password: "123456",
      },
      {
        img: "ryan.jpg",
        email: "test6@gmail.com",
        name: "Ryan Welles",
        username: "voyager.344",
        password: "123456",
      },
      {
        img: "george.jpg",
        email: "test7@gmail.com",
        name: "George Partridge",
        username: "soccerviewer8",
        password: "123456",
      },
      {
        img: "javier.jpg",
        email: "test8@gmail.com",
        name: "Javier Pollard",
        username: "warlikeduke",
        password: "123456",
      },
      {
        img: "roxanne.jpg",
        email: "test9@gmail.com",
        name: "Roxanne Travis",
        username: "peppersprime32",
        password: "123456",
      },
      {
        img: "victoria.jpg",
        email: "test10@gmail.com",
        name: "Victoria Mejia",
        username: "arlen_the_marlin",
        password: "123456",
      },
      {
        img: "zena.jpg",
        email: "test11@gmail.com",
        name: "Zena Kelley",
        username: "velvetround",
        password: "123456",
      },
      {
        img: "jackson.jpg",
        email: "test12@gmail.com",
        name: "Jackson Barker",
        username: "countryspirit",
        password: "123456",
      },
      {
        img: "judah.jpg",
        email: "test13@gmail.com",
        name: "Judah Doe",
        username: "judah.doe",
        password: "123456",
      },
    ]);
  }
}
