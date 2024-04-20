import { SlashCommandBuilder } from "discord.js";
import Database from "better-sqlite3";
const db = new Database(process.env.DATABASEURL);

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
      const checkStmt = db.prepare("SELECT * FROM player WHERE id = ?");
      const checkResult = checkStmt.get(interaction.user.id);
      if (checkResult) {
        interaction.reply({
          content: "You already have a character created",
          ephemeral: true,
        });
        return;
      }
      const characterName = interaction.options.getString("name");
      const inStmt = db.prepare("INSERT INTO player(id, name) VALUES (?, ?)");
      inStmt.run(interaction.user.id, characterName);

      const playerSkillStmt = db.prepare(
        "INSERT INTO player_skills(player_id, skill_key, xp) VALUES (?, ?, ?)"
      );

      playerSkillStmt.run(interaction.user.id, "FISH", 0);
      playerSkillStmt.run(interaction.user.id, "SAIL", 0);
      playerSkillStmt.run(interaction.user.id, "RESEARCH", 0);
      playerSkillStmt.run(interaction.user.id, "CART", 0);
      playerSkillStmt.run(interaction.user.id, "REPAIR", 0);

      await interaction.reply(`${characterName}... You are now on the boat.`);
    } catch (error) {
      console.error(error);
    }
  },
};
