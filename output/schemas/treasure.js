import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { boat } from './boat.js';
import { item } from './item.js';
import { relations } from 'drizzle-orm';
export const treasure = sqliteTable('treasure', {
    id: integer('id').primaryKey(),
    boatId: text('boat_id')
        .notNull()
        .references(() => boat.id),
    itemKey: text('item_key')
        .notNull()
        .references(() => item.key),
    xCoord: integer('x_coord').notNull(),
    yCoord: integer('y_coord').notNull(),
});
export const treasureRelations = relations(treasure, ({ one }) => ({
    item: one(item, {
        fields: [treasure.itemKey],
        references: [item.key],
    }),
    boat: one(boat, {
        fields: [treasure.boatId],
        references: [boat.id],
    }),
}));
