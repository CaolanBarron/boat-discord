import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { boat } from './boat.js';
import { effect } from './effect.js';
import { relations } from 'drizzle-orm';
export const boatEffect = sqliteTable('boat_effect', {
    boatId: text('boat_id').references(() => boat.id),
    effectId: integer('effect_id').references(() => effect.id),
});
export const boatEffectRelations = relations(boatEffect, ({ one }) => ({
    effect: one(effect, {
        fields: [boatEffect.effectId],
        references: [effect.id],
    }),
    boat: one(boat, {
        fields: [boatEffect.boatId],
        references: [boat.id],
    }),
}));
