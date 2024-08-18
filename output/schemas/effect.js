import { integer, sqliteTable, text, unique } from 'drizzle-orm/sqlite-core';
import { boatEffect } from './boatEffect.js';
import { relations } from 'drizzle-orm';
import { promptOutcome } from './promptOutcome.js';
export const effect = sqliteTable(
    'effect',
    {
        id: integer('id').primaryKey(),
        key: text('key').notNull(),
        name: text('name').notNull(),
        description: text('description').notNull(),
        type: text('type').default('BUFF').notNull(),
        rarity: text('rarity').default('COMMON').notNull(),
    },
    (t) => ({
        unq: unique().on(t.key, t.type),
    }),
);
export const effectRelations = relations(effect, ({ many }) => ({
    boatEffects: many(boatEffect),
    promptOutcomes: many(promptOutcome),
}));
