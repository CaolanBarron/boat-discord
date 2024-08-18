import { integer, numeric, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { player } from './player.js';
import { relations } from 'drizzle-orm';
export const activeTags = sqliteTable('active_tags', {
    key: text('key').notNull(),
    playerId: integer('player_id').references(() => player.id),
    boat: numeric('boat'),
});
export const activeTagsRelations = relations(activeTags, ({ one }) => ({
    player: one(player, {
        fields: [activeTags.playerId],
        references: [player.id],
    }),
}));
