import { SlashCommandBuilder } from "discord.js";
import schedule from "node-schedule";
import db from "../../../database/database.js";
import ActivityService from "../../services/ActivityService.js";

export default {
  data: new SlashCommandBuilder()
    .setName("map")
    .setDescription("Draw and decipher maps. Cartography++"),
  async execute(interaction) {
    // TODO: Check if you are currently doing any other activity

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
    stmt.run("CARTOGRAPHY", interaction.player.id);

    ActivityService.scheduleActivity("CARTOGRAPHY", interaction);

    //TODO: Change this reply
    await interaction.reply("Map!");
  },
};
