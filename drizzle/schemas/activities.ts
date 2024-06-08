import { numeric, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const activities = sqliteTable("activities", {
  key: text("key").primaryKey(),
  name: text("name"),
  allowDuringSail: numeric("allow_during_sail"),
});
