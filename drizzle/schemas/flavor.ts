import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { tag } from './tag';
import { relations } from 'drizzle-orm';

export const flavor = sqliteTable('flavor', {
    key: integer('key').primaryKey(),
    content: text('content'),
    tag: text('tag').references(() => tag.key),
    subject: text('subject').default('PLAYER').notNull(),
});

export const flavorRelations = relations(flavor, ({ one }) => ({
    tag: one(tag, {
        fields: [flavor.tag],
        references: [tag.key],
    }),
}));
