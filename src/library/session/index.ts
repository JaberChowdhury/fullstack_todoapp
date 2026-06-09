import { getCookie, setCookie, deleteCookie } from "hono/cookie";
import type { Context } from "hono";

// In-memory session store mapping sessionId to userId
const sessions = new Map<string, string>();

export const createSession = (c: Context, userId: string) => {
  const sessionId = crypto.randomUUID();
  sessions.set(sessionId, userId);
  setCookie(c, "sessionId", sessionId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    sameSite: "Strict",
    maxAge: 60 * 60 * 24 * 7, // 1 week
  });
};

export const getSession = (c: Context): string | null => {
  const sessionId = getCookie(c, "sessionId");
  if (!sessionId) return null;
  return sessions.get(sessionId) || null;
};

export const destroySession = (c: Context) => {
  const sessionId = getCookie(c, "sessionId");
  if (sessionId) {
    sessions.delete(sessionId);
  }
  deleteCookie(c, "sessionId", { path: "/" });
};
