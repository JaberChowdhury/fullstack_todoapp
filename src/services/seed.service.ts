import { db } from "..";

const reset_db = async () => {
  const data = await db.readTable("todoapp", "todos");

  console.log({ data });
};
export { reset_db };
