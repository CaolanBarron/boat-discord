import { SlashCommandBuilder } from "discord.js";
import db from "../../../database/database.js";
import ActivityService from "../../services/ActivityService.js";

export default {
  data: new SlashCommandBuilder()
    .setName("repair")
    .setDescription("Repair and maintain the boat. Repair++"),
  async execute(interaction) {
    const existResult = ActivityService.checkActive(interaction.player.id);
    if (existResult) {
      await interaction.reply(
        `${interaction.player.name} is currently busy... ` + existResult
      );
      return;
    }

    const stmt = db.prepare(
      "INSERT INTO active_tags(key, player_relation) VALUES(?, ?)"
    );
    stmt.run("REPAIR", interaction.player.id);

    ActivityService.scheduleActivity("REPAIR", interaction);

    await interaction.reply("Repair");
  },
};
