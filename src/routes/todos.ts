import { Hono } from "hono";
import { db } from "../index";
import { getSession } from "../library/session";

const todosRoute = new Hono();

// GET all todos
todosRoute.get("/", async (c) => {
  const userId = getSession(c);
  if (!userId) return c.json({ error: "Unauthorized" }, 401);

  const table = await db.readTable("todoapp", "todos");
  const userTodos = (table.data || []).filter((t: any) => t.userId === userId);
  return c.json(userTodos);
});

// GET a specific todo
todosRoute.get("/:id", async (c) => {
  const userId = getSession(c);
  if (!userId) return c.json({ error: "Unauthorized" }, 401);

  const id = c.req.param("id");
  const table = await db.readTable("todoapp", "todos");
  const todo = table.data?.find((t: any) => t.id === id && t.userId === userId);

  if (!todo) return c.json({ error: "Todo not found" }, 404);
  return c.json(todo);
});

// POST a new todo
todosRoute.post("/", async (c) => {
  const userId = getSession(c);
  if (!userId) return c.json({ error: "Unauthorized" }, 401);

  const body = await c.req.json();
  const newTodo = {
    id: crypto.randomUUID(),
    userId,
    title: body.title,
    description: body.description,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    isComplete: false,
  };
  await db.writeTable("todoapp", "todos", newTodo);
  return c.json(newTodo, 201);
});

// PUT update a todo
todosRoute.put("/:id", async (c) => {
  const userId = getSession(c);
  if (!userId) return c.json({ error: "Unauthorized" }, 401);

  const id = c.req.param("id");
  const body = await c.req.json();
  const table = await db.readTable("todoapp", "todos");
  const todos = table.data || [];

  const index = todos.findIndex((t: any) => t.id === id && t.userId === userId);
  if (index === -1) return c.json({ error: "Todo not found" }, 404);

  const updatedTodo = {
    ...todos[index],
    ...body,
    userId, // Prevent reassignment
    updatedAt: new Date().toISOString(),
  };
  todos[index] = updatedTodo;

  await db.setTableData("todoapp", "todos", todos);
  return c.json(updatedTodo);
});

// DELETE a todo
todosRoute.delete("/:id", async (c) => {
  const userId = getSession(c);
  if (!userId) return c.json({ error: "Unauthorized" }, 401);

  const id = c.req.param("id");
  const table = await db.readTable("todoapp", "todos");
  let todos = table.data || [];

  const todoToDelete = todos.find((t: any) => t.id === id && t.userId === userId);
  if (!todoToDelete) return c.json({ error: "Todo not found" }, 404);

  todos = todos.filter((t: any) => t.id !== id);
  await db.setTableData("todoapp", "todos", todos);

  await db.writeTable("todoapp", "deletedTodos", todoToDelete);

  return c.json({ message: "Todo deleted successfully" });
});

export { todosRoute };
