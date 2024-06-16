import { integer, sqliteTable, text, unique } from 'drizzle-orm/sqlite-core';
import { boatEffect } from './boatEffect';
import { relations } from 'drizzle-orm';
import { promptOutcome } from './promptOutcome';

export const effect = sqliteTable(
    'effect',
    {
        id: integer('id').primaryKey(),
        key: text('key').notNull(),
        name: text('name').notNull(),
        description: text('description').notNull(),
        effectType: text('effect_type').default('BUFF').notNull(),
        rarity: text('rarity').default('COMMON').notNull(),
    },
    (t) => ({
        unq: unique().on(t.key, t.effectType),
    })
);

export const effectRelations = relations(effect, ({ many }) => ({
    boatEffects: many(boatEffect),
    promptOutcomes: many(promptOutcome),
}));
