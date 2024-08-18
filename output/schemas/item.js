import { relations } from 'drizzle-orm';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { boatInventory } from './boatInventory.js';
import { loot } from './loot.js';
import { itemTransformation } from './itemTransformation.js';
import { treasure } from './treasure.js';
import { itemUses } from './itemUses.js';
import { lootItem } from './lootItem.js';
export const item = sqliteTable('item', {
    key: text('key').primaryKey(),
    name: text('name'),
    description: text('description'),
    info: text('info'),
    consumable: integer('consumable', { mode: 'boolean' }).default(false),
    useDescription: text('use_description'),
    special: integer('special', { mode: 'boolean' }).default(false),
});
export const itemRelations = relations(item, ({ many }) => ({
    boatInventories: many(boatInventory),
    loots: many(loot),
    itemTransformationsTransformation: many(itemTransformation, {
        relationName: 'item_transformation_transformation_item_key',
    }),
    itemTransformationsOriginal: many(itemTransformation, {
        relationName: 'item_transformation_original_item_key',
    }),
    treasures: many(treasure),
    itemUses: many(itemUses),
    lootItem: many(lootItem),
}));
