import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { biome } from "./biome";
import { relations } from "drizzle-orm";

export const biomeCoords = sqliteTable("biome_coords", {
  biomeKey: text("biome_key").references(() => biome.key),
  xCoord: integer("x_coord"),
  yCoord: integer("y_coord"),
});
export const biomeCoordsRelations = relations(biomeCoords, ({ one }) => ({
  biome: one(biome, {
    fields: [biomeCoords.biomeKey],
    references: [biome.key],
  }),
}));
