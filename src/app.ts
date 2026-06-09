import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { prettyJSON } from "hono/pretty-json";
import { secureHeaders } from "hono/secure-headers";
import { todosRoute } from "./routes/todos";
import { seedRoute } from "./routes/seed";
import { db } from "./index";
import { createSession, getSession, destroySession } from "./library/session";
import { join } from "node:path";

const app = new Hono();

app.use("*", logger());
app.use("*", cors());
app.use("*", secureHeaders());
app.use("*", prettyJSON());

app.get("/", async (c) => {
  try {
    const html = await Bun.file(join(process.cwd(), "src/public/index.html")).text();
    return c.html(html);
  } catch (e) {
    return c.text("UI not found", 404);
  }
});

app.post("/api/auth/login", async (c) => {
  const { email, password } = await c.req.json();
  const table = await db.readTable("todoapp", "users");
  const user = table.data?.find((u: any) => u.email === email && u.password === password);

  if (!user) return c.json({ error: "Invalid credentials" }, 401);

  createSession(c, user.id);
  const { password: _, ...safeUser } = user;
  return c.json({ message: "Logged in", user: safeUser });
});

app.get("/api/auth/me", async (c) => {
  const userId = getSession(c);
  if (!userId) return c.json({ error: "Unauthorized" }, 401);

  const table = await db.readTable("todoapp", "users");
  const user = table.data?.find((u: any) => u.id === userId);

  if (!user) return c.json({ error: "User not found" }, 404);

  const { password: _, ...safeUser } = user;
  return c.json({ user: safeUser });
});

app.post("/api/auth/logout", (c) => {
  destroySession(c);
  return c.json({ message: "Logged out" });
});

app.route("/api/todos", todosRoute);
app.route("/seed", seedRoute);

export default app;
