import { relations } from 'drizzle-orm';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { player } from './player.js';
import { boat } from './boat.js';
import { item } from './item.js';
export const boatInventory = sqliteTable('boat_inventory', {
    id: integer('id').primaryKey(),
    boatId: text('boat_id')
        .notNull()
        .references(() => boat.id),
    itemKey: text('item_key')
        .notNull()
        .references(() => item.key),
    collectedBy: integer('collected_by').references(() => player.id),
    lockedBy: integer('locked_by').references(() => player.id),
});
export const boatInventoryRelations = relations(boatInventory, ({ one }) => ({
    playerLockedBy: one(player, {
        fields: [boatInventory.lockedBy],
        references: [player.id],
        relationName: 'boat_inventory_locked_by_player_id',
    }),
    playerCollectedBy: one(player, {
        fields: [boatInventory.collectedBy],
        references: [player.id],
        relationName: 'boat_inventory_collected_by_player_id',
    }),
    item: one(item, {
        fields: [boatInventory.itemKey],
        references: [item.key],
    }),
    boat: one(boat, {
        fields: [boatInventory.boatId],
        references: [boat.id],
    }),
}));
