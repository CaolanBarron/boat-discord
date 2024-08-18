import { sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { item } from './item.js';
import { relations } from 'drizzle-orm';
export const itemTransformation = sqliteTable('item_transformation', {
    original: text('original').references(() => item.key),
    transformation: text('transformation').references(() => item.key),
    rarity: text('rarity').default('COMMON').notNull(),
});
export const itemTransformationRelations = relations(
    itemTransformation,
    ({ one }) => ({
        itemTransformation: one(item, {
            fields: [itemTransformation.transformation],
            references: [item.key],
            relationName: 'item_transformation_transformation_item_key',
        }),
        itemOriginal: one(item, {
            fields: [itemTransformation.original],
            references: [item.key],
            relationName: 'item_transformation_original_item_key',
        }),
    }),
);
