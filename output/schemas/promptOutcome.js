import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { promptAction } from './promptAction.js';
import { effect } from './effect.js';
import { relations } from 'drizzle-orm';
export const promptOutcome = sqliteTable('prompt_outcome', {
    id: integer('id').primaryKey(),
    actionId: integer('action_id').references(() => promptAction.id),
    content: text('content').notNull(),
    outcomeType: text('outcome_type').default('SUCCESS').notNull(),
    effectId: integer('effect_id').references(() => effect.id),
});
export const promptOutcomeRelations = relations(promptOutcome, ({ one }) => ({
    effect: one(effect, {
        fields: [promptOutcome.effectId],
        references: [effect.id],
    }),
    promptAction: one(promptAction, {
        fields: [promptOutcome.actionId],
        references: [promptAction.id],
    }),
}));
