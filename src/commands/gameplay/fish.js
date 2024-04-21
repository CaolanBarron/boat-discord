import { SlashCommandBuilder } from "discord.js";
import schedule from "node-schedule";
import Database from "better-sqlite3";
const db = new Database(process.env.DATABASEURL);
import ActivityService from "../../services/ActivityService.js";

export default {
  data: new SlashCommandBuilder()
    .setName("fish")
    .setDescription(
      "Cast your rod and fish for a while. Fishing++ (10 minutes)"
    ),
  async execute(interaction) {
    // TODO: Check if you are currently doing any other activity

    const activityExists = db
      .prepare(
        "SELECT * FROM active_tags WHERE key = ? AND player_relation = ?"
      )
      .get();

    const stmt = db.prepare(
      "INSERT INTO active_tags(key, player_relation) VALUES(?, ?)"
    );
    stmt.run("FISH", interaction.player.id);

    ActivityService.scheduleActivity("FISH", interaction);

    //TODO: Change this reply
    await interaction.reply("Fish!");
  },
};
