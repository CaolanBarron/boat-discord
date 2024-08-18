import { sqliteTable, text } from 'drizzle-orm/sqlite-core';
export const feedback = sqliteTable('feedback', {
    playerName: text('player_name'),
    message: text('message'),
});
