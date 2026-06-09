import app from "./app";
import { filedb } from "./library/database";

export default {
  port: 3001,
  fetch: app.fetch,
};

const todoColumns = [
  "id",
  "userId",
  "title",
  "description",
  "createdAt",
  "updatedAt",
  "isComplete",
];

const dbSchema = {
  databaseName: "todoapp",
  tables: [
    {
      name: "users",
      cols: ["id", "name", "email", "password", "createdAt", "age", "location"],
    },
    {
      name: "todos",
      cols: todoColumns,
    },
    {
      name: "deletedTodos",
      cols: todoColumns,
    },
    {
      name: "posts",
      cols: ["id", "userid", "title", "descriptions", "createdat"],
    },
  ],
};

export const db = new filedb();

db.init(dbSchema);
