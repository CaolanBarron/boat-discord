import { sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { biome } from './biome.js';
import { relations } from 'drizzle-orm';
import { lootItem } from './lootItem.js';
export const loot = sqliteTable('loot', {
    key: text('key'),
    biome: text('biome_key').references(() => biome.key),
});
export const lootRelations = relations(loot, ({ many }) => ({
    lootItem: many(lootItem),
}));
