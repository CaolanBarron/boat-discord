import { relations, sql } from "drizzle-orm";
import { integer, numeric, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { boat } from "./boat";

export const boatTravelHistory = sqliteTable("boat_travel_history", {
  id: integer("id").primaryKey(),
  boatId: integer("boat_id")
    .notNull()
    .references(() => boat.id),
  xCoord: integer("x_coord").notNull(),
  yCoord: integer("y_coord").notNull(),
  biome: text("biome"),
  timestamp: numeric("timestamp").default(sql`(CURRENT_TIMESTAMP)`),
});

export const boatTravelHistoryRelations = relations(
  boatTravelHistory,
  ({ one }) => ({
    boat: one(boat, {
      fields: [boatTravelHistory.boatId],
      references: [boat.id],
    }),
  })
);
