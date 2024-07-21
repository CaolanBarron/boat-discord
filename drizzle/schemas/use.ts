import { relations } from 'drizzle-orm';
import { sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { itemUses } from './itemUses';

export const use = sqliteTable('use', {
    key: text('key').primaryKey(),
    name: text('name'),
});

export const useRelations = relations(use, ({ many }) => ({
    boatInventories: many(itemUses),
}));
