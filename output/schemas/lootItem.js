import { sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { item } from './item.js';
import { loot } from './loot.js';
import { relations } from 'drizzle-orm';
export const lootItem = sqliteTable('loot_item', {
    lootKey: text('loot_key').references(() => loot.key),
    itemKey: text('item_key').references(() => item.key),
    rarity: text('rarity'),
});
export const lootItemRelations = relations(lootItem, ({ one }) => ({
    item: one(item, {
        fields: [lootItem.itemKey],
        references: [item.key],
    }),
    loot: one(loot, {
        fields: [lootItem.lootKey],
        references: [loot.key],
    }),
}));
