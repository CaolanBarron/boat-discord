import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { item } from './item.js';
import { use } from './use.js';
import { relations } from 'drizzle-orm';
export const itemUses = sqliteTable('item_uses', {
    itemKey: text('item_key').references(() => item.key),
    useKey: text('use_key').references(() => use.key),
    variable: integer('variable'),
});
export const itemUsesRelations = relations(itemUses, ({ one }) => ({
    item: one(item, {
        fields: [itemUses.itemKey],
        references: [item.key],
    }),
    use: one(use, {
        fields: [itemUses.useKey],
        references: [use.key],
    }),
}));
