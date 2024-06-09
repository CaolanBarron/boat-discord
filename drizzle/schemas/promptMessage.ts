import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { promptAction } from './promptAction';
import { relations } from 'drizzle-orm';

export const promptMessage = sqliteTable('prompt_message', {
    id: integer('id').primaryKey(),
    content: text('content'),
});

export const promptMessageRelations = relations(promptMessage, ({ many }) => ({
    promptActions: many(promptAction),
}));
