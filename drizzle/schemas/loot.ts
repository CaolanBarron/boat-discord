import { sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { item } from './item';
import { relations } from 'drizzle-orm';

export const loot = sqliteTable('loot', {
    key: text('key'),
    itemKey: text('item_key').references(() => item.key),
    rarity: text('rarity'),
});

export const lootRelations = relations(loot, ({ one }) => ({
    item: one(item, {
        fields: [loot.itemKey],
        references: [item.key],
    }),
}));
