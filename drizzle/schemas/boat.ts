import { relations } from 'drizzle-orm';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { player } from './player';
import { boatInventory } from './boatInventory';
import { boatTravelHistory } from './boatTravelHistory';
import { boatEffect } from './boatEffect';
import { treasure } from './treasure';

export const boat = sqliteTable('boat', {
    id: text('id').primaryKey(),
    condition: integer('condition'),
    speed: integer('speed'),
    xCoord: integer('x_coord'),
    yCoord: integer('y_coord'),
});

export const boatRelations = relations(boat, ({ many }) => ({
    players: many(player),
    boatInventories: many(boatInventory),
    boatTravelHistories: many(boatTravelHistory),
    boatEffects: many(boatEffect),
    treasures: many(treasure),
}));
