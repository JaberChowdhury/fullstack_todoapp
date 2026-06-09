import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { prettyJSON } from "hono/pretty-json";
import { secureHeaders } from "hono/secure-headers";
import { todosRoute } from "./routes/todos";
import { seedRoute } from "./routes/seed";

const app = new Hono();

app.use("*", logger());
app.use("*", cors());
app.use("*", secureHeaders());
app.use("*", prettyJSON());

app.get("/", (c) => {
  return c.text("tnx bro");
});

app.route("/api/todos", todosRoute);
app.route("/seed", seedRoute);

export default app;
