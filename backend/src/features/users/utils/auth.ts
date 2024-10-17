import { HonoRequest } from "hono";

const parseCookie = (cookie: string) => {
  return Object.fromEntries(
    cookie.split(";").map((cookie) => cookie.trim().split("="))
  );
};

export const isAdmin = (req: HonoRequest): boolean => {
  const cookies = parseCookie(req.header("cookie") ?? "");
  return cookies["user.role"] === "admin";
};