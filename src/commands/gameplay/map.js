import { SlashCommandBuilder } from "discord.js";
import schedule from "node-schedule";
import Database from "better-sqlite3";
const db = new Database(process.env.DATABASEURL);
import ActivityService from "../../services/ActivityService.js";

export default {
  data: new SlashCommandBuilder()
    .setName("map")
    .setDescription("Draw and decipher maps. Cartography++"),
  async execute(interaction) {
    // TODO: Check if you are currently doing any other activity

    const stmt = db.prepare(
      "INSERT INTO active_tags(key, player_relation) VALUES(?, ?)"
    );
    stmt.run("CARTOGRAPHY", interaction.user.id);

    const startTime = new Date(Date.now() + 5000);
    schedule.scheduleJob(
      startTime,
      ActivityService.map.bind(null, interaction)
    );

    //TODO: Change this reply
    await interaction.reply("Map!");
  },
};
