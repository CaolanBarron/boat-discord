import { relations } from 'drizzle-orm';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { boatInventory } from './boatInventory';
import { loot } from './loot';
import { itemTransformation } from './itemTransformation';
import { treasure } from './treasure';
import { itemUses } from './itemUses';

export const item = sqliteTable('item', {
    key: text('key').primaryKey(),
    name: text('name'),
    description: text('description'),
    info: text('info'),
    consumable: integer('consumable', { mode: 'boolean' }).default(false),
    useDescription: text('use_description'),
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
}));
