import { db } from "..";
import { faker } from "@faker-js/faker";

const reset_db = async () => {
  console.log("Seeding database...");

  const users = Array.from({ length: 5 }).map(() => ({
    id: faker.string.uuid(),
    name: faker.person.fullName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    createdAt: faker.date.past().toISOString(),
    age: faker.number.int({ min: 18, max: 80 }),
    location: faker.location.city(),
  }));

  const todos = users.flatMap((user) => {
    const numTodos = faker.number.int({ min: 2, max: 3 });
    return Array.from({ length: numTodos }).map(() => ({
      id: faker.string.uuid(),
      userId: user.id,
      title: faker.lorem.sentence({ min: 3, max: 6 }),
      description: faker.lorem.paragraph(),
      createdAt: faker.date.past().toISOString(),
      updatedAt: faker.date.recent().toISOString(),
      isComplete: faker.datatype.boolean(),
    }));
  });

  const posts = users.flatMap((user) => {
    const numPosts = faker.number.int({ min: 1, max: 2 });
    return Array.from({ length: numPosts }).map(() => ({
      id: faker.string.uuid(),
      userid: user.id,
      title: faker.lorem.sentence({ min: 4, max: 8 }),
      descriptions: faker.lorem.paragraphs(2),
      createdat: faker.date.past().toISOString(),
    }));
  });

  await db.setTableData("todoapp", "users", users);
  await db.setTableData("todoapp", "todos", todos);
  await db.setTableData("todoapp", "deletedTodos", []);
  await db.setTableData("todoapp", "posts", posts);

  console.log("Database seeded successfully!");
};

export { reset_db };
