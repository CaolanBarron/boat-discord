import { relations } from 'drizzle-orm';
import { sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { biomeCoords } from './biomeCoords.js';
import { lootItem } from './lootItem.js';
export const biome = sqliteTable('biome', {
    key: text('key').primaryKey(),
    name: text('name'),
    info: text('info'),
});
export const biomeRelations = relations(biome, ({ many }) => ({
    biomeCoords: many(biomeCoords),
    lootItem: many(lootItem),
}));
