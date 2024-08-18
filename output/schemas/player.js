import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { boat } from './boat.js';
import { relations } from 'drizzle-orm';
import { playerSkills } from './playerSkills.js';
import { boatInventory } from './boatInventory.js';
import { activeTags } from './activeTags.js';
export const player = sqliteTable('player', {
    id: integer('id').primaryKey(),
    userId: text('user_id'),
    boatId: text('boat_id').references(() => boat.id),
    name: text('name'),
});
export const playerRelations = relations(player, ({ one, many }) => ({
    boat: one(boat, {
        fields: [player.userId],
        references: [boat.id],
    }),
    playerSkills: many(playerSkills),
    boatInventoriesLockedBy: many(boatInventory, {
        relationName: 'boat_inventory_locked_by_player_id',
    }),
    boatInventoriesCollectedBy: many(boatInventory, {
        relationName: 'boat_inventory_collected_by_player_id',
    }),
    activeTags: many(activeTags),
}));
