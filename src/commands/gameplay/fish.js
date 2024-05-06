import { SlashCommandBuilder } from "discord.js";
import Database from "better-sqlite3";
const db = new Database(process.env.DATABASEURL);
import ActivityService from "../../services/ActivityService.js";

export default {
  data: new SlashCommandBuilder()
    .setName("fish")
    .setDescription(
      "Cast the only fishing rod and fish for a while. Fishing++ (10 minutes)"
    ),
  async execute(interaction) {
    try {
      // TODO: Check if you are currently doing any other activity

      const existResult = ActivityService.checkActive(interaction.player);
      if (existResult) {
        await interaction.reply({
          content: existResult,
          ephemeral: true,
        });
        return;
      }

      const stmt = db.prepare(
        "INSERT INTO active_tags(key, player_relation) VALUES(?, ?)"
      );
      stmt.run("FISH", interaction.player.id);

      ActivityService.scheduleActivity("FISH", interaction);

      await interaction.reply(
        `${interaction.player.name} has taken the fishing rod and cast it into the water, they wait patiently...`
      );
    } catch (error) {
      console.error(error);
    }
  },
};
