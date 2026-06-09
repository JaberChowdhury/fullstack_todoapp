import { Hono } from "hono";
import { reset_db } from "../services/seed.service";
const seedRoute = new Hono();

seedRoute.get("/", async (c) => {
  await reset_db();
  console.log({ message: "database seeded" });
  return c.text("database seeded");
});
export { seedRoute };
