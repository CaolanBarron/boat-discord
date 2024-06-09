import { relations } from 'drizzle-orm';
import { sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { playerSkills } from './playerSkills';
import { promptAction } from './promptAction';

export const skill = sqliteTable('skill', {
    key: text('key').primaryKey(),
    name: text('name'),
});

export const skillRelations = relations(skill, ({ many }) => ({
    playerSkills: many(playerSkills),
    promptActions: many(promptAction),
}));
