import { Hono } from "hono";

const todosRoute = new Hono();

todosRoute.get("/get", (c) => {
  return c.text("todos get");
});
export { todosRoute };
