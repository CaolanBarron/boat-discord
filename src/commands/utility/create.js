import { SlashCommandBuilder } from "discord.js";
import db from "../../../database/database.js";

export default {
  data: new SlashCommandBuilder()
    .setName("create")
    .setDescription("Creates a player character!")
    .addStringOption((option) =>
      option
        .setName("name")
        .setDescription("The player characters name")
        .setRequired(true)
    ),
  async execute(interaction) {
    try {
      const checkStmt = db().prepare(
        "SELECT * FROM player WHERE user_id = ? AND boat_id = ?"
      );
      const checkResult = checkStmt.get(
        interaction.user.id,
        interaction.guildId
      );
      if (checkResult) {
        interaction.reply({
          content: "You already have a character created",
          ephemeral: true,
        });
        return;
      }
      const characterName = interaction.options.getString("name");
      const inStmt = db().prepare(
        "INSERT INTO player(user_id, boat_id, name) VALUES (?, ?, ?)"
      );
      const result = inStmt.run(
        interaction.user.id,
        interaction.guildId,
        characterName
      );

      const playerSkillStmt = db().prepare(
        "INSERT INTO player_skills(player_id, skill_key, xp) VALUES (?, ?, ?)"
      );

      playerSkillStmt.run(result.lastInsertRowid, "FISH", 0);
      playerSkillStmt.run(result.lastInsertRowid, "SAIL", 0);
      playerSkillStmt.run(result.lastInsertRowid, "RESEARCH", 0);
      playerSkillStmt.run(result.lastInsertRowid, "CARTOGRAPHY", 0);
      playerSkillStmt.run(result.lastInsertRowid, "REPAIR", 0);

      await interaction.reply(`${characterName}... You are now on the boat.`);
    } catch (error) {
      console.error(error);
    }
  },
};
