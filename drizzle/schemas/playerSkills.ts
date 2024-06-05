import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { player } from "./player";
import { skill } from "./skill";
import { relations } from "drizzle-orm";

export const playerSkills = sqliteTable("player_skills", {
  playerId: integer("player_id").references(() => player.id),
  skillKey: text("skill_key").references(() => skill.key),
  xp: integer("xp"),
});

export const playerSkillsRelations = relations(playerSkills, ({ one }) => ({
  skill: one(skill, {
    fields: [playerSkills.skillKey],
    references: [skill.key],
  }),
  player: one(player, {
    fields: [playerSkills.playerId],
    references: [player.id],
  }),
}));
