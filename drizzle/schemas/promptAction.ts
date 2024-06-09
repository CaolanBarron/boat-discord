import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { promptMessage } from './promptMessage';
import { relations } from 'drizzle-orm';
import { skill } from './skill';
import { promptOutcome } from './promptOutcome';

export const promptAction = sqliteTable('prompt_action', {
    id: integer('id').primaryKey(),
    messageId: integer('message_id')
        .notNull()
        .references(() => promptMessage.id),
    content: text('content').notNull(),
    challengeSkill: text('challenge_skill').references(() => skill.key),
    challengeValue: integer('challenge_value'),
});

export const promptActionRelations = relations(
    promptAction,
    ({ one, many }) => ({
        skill: one(skill, {
            fields: [promptAction.challengeSkill],
            references: [skill.key],
        }),
        promptMessage: one(promptMessage, {
            fields: [promptAction.messageId],
            references: [promptMessage.id],
        }),
        promptOutcomes: many(promptOutcome),
    })
);
