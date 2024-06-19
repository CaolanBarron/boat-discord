import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { relations } from 'drizzle-orm';
import { promptAction } from './promptAction';
import { tag } from './tag';

export const promptMessage = sqliteTable('prompt_message', {
    id: integer('id').primaryKey(),
    content: text('content'),
    tagKey: text('tag_key').references(() => tag.key),
});

export const promptMessageRelations = relations(
    promptMessage,
    ({ one, many }) => ({
        promptActions: many(promptAction),
        tag: one(tag, {
            fields: [promptMessage.tagKey],
            references: [tag.key],
        }),
    })
);
