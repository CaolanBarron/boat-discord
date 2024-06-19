import { sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { flavor } from './flavor';
import { relations } from 'drizzle-orm';
import { promptMessage } from './promptMessage';

export const tag = sqliteTable('tag', {
    key: text('key').primaryKey(),
});

export const tagRelations = relations(tag, ({ many }) => ({
    flavors: many(flavor),
    promptMessages: many(promptMessage),
}));
