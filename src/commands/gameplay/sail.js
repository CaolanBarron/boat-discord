import { SlashCommandBuilder } from "discord.js";
import Database from "better-sqlite3";
import schedule from "node-schedule";
const db = new Database(process.env.DATABASEURL);
import ActivityService from "../../services/ActivityService.js";

export default {
  data: new SlashCommandBuilder()
    .setName("sail")
    .setDescription("Sail in a direction. Sail++")
    .addStringOption((option) =>
      option
        .setName("direction")
        .setDescription("Where shall we sail?")
        .setRequired(true)
        .addChoices(
          { name: "North", value: "north" },
          { name: "East", value: "east" },
          { name: "South", value: "south" },
          { name: "West", value: "west" }
        )
    ),
  async execute(interaction) {
    const stmt = db.prepare(
      "INSERT INTO active_tags(key, player_relation) VALUES(?, ?)"
    );
    stmt.run("SAILING", interaction.user.id);

    const startTime = new Date(Date.now() + 5000);
    schedule.scheduleJob(
      startTime,
      ActivityService.sailing.bind(null, interaction)
    );

    await interaction.reply(interaction.options.getString("direction"));
  },
};
