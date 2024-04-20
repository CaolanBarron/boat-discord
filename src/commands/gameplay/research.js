import { SlashCommandBuilder } from "discord.js";
import schedule from "node-schedule";
import Database from "better-sqlite3";
const db = new Database(process.env.DATABASEURL);
import ActivityService from "../../services/ActivityService.js";

export default {
  data: new SlashCommandBuilder()
    .setName("research")
    .setDescription("Research biological matter. Lab++")
    .addStringOption((option) =>
      option.setName("item").setDescription("Item from inventory to research")
    ),
  async execute(interaction) {
    const stmt = db.prepare(
      "INSERT INTO active_tags(key, player_relation) VALUES(?, ?)"
    );
    stmt.run("RESEARCH", interaction.user.id);

    const startTime = new Date(Date.now() + 5000);
    schedule.scheduleJob(
      startTime,
      ActivityService.research.bind(null, interaction)
    );

    await interaction.reply("Research!");
  },
};
