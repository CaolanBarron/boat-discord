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
    const existResult = ActivityService.checkActive(interaction.player.id);
    if (existResult) {
      await interaction.reply(
        `${interaction.player.name} is currently busy... ` + existResult
      );
      return;
    }
    // TODO: Need to save additional data for sailing direction 😭
    const stmt = db.prepare(
      "INSERT INTO active_tags(key, player_relation) VALUES(?, ?)"
    );
    stmt.run("SAILING", interaction.player.id);

    ActivityService.scheduleActivity("SAILING", interaction);

    await interaction.reply(interaction.options.getString("direction"));
  },
};
