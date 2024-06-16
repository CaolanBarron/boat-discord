import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { boatEffect } from './boatEffect';
import { relations } from 'drizzle-orm';
import { promptOutcome } from './promptOutcome';

export const effect = sqliteTable('effect', {
    id: integer('id').primaryKey(),
    key: text('key').notNull(),
    name: text('name').notNull(),
    description: text('description').notNull(),
    effectType: text('effect_type').default('BUFF').notNull(),
    rarity: text('rarity').default('COMMON').notNull(),
});

export const effectRelations = relations(effect, ({ many }) => ({
    boatEffects: many(boatEffect),
    promptOutcomes: many(promptOutcome),
}));
