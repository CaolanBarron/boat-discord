import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';
import { item } from './item.js';
import { loot } from './loot.js';
import { relations } from 'drizzle-orm';
export const lootItem = sqliteTable('loot_item', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    lootId: integer('loot_id').references(() => loot.id),
    itemKey: text('item_key').references(() => item.key),
    rarity: text('rarity'),
});
export const lootItemRelations = relations(lootItem, ({ one }) => ({
    item: one(item, {
        fields: [lootItem.itemKey],
        references: [item.key],
    }),
    loot: one(loot, {
        fields: [lootItem.lootId],
        references: [loot.id],
    }),
}));
