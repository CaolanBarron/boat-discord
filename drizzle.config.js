import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "sqlite",
  schema: "./drizzle/schemas/*.ts",
  out: "./drizzle",
  url: "./database/database-development.db",
  dbCredentials: { url: "./database/drizzle.db" },
  introspect: { casing: "casing" },
});
