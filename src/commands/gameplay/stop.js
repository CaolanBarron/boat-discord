import { SlashCommandBuilder } from "discord.js";
import schedule from "node-schedule";
import ActivityService from "../../services/ActivityService.js";
import Database from "better-sqlite3";
const db = new Database(process.env.DATABASEURL);

export default {
  data: new SlashCommandBuilder()
    .setName("stop")
    .setDescription("Stops whatever activity you are doing"),
  async execute(interaction) {
    try {
      const current = ActivityService.getCurrent(interaction.player);

      if (!current) {
        await interaction.reply({
          content: "Youre not doing anythinh anyway",
          ephemeral: true,
        });
      }

      // Delete the active_tag from the database
      const tagsStmt = db.prepare(
        "DELETE FROM active_tags WHERE key = ? AND player_relation = ?"
      );

      tagsStmt.run(current.key, interaction.player.id);

      // Delete the current job
      schedule.cancelJob(`${interaction.player.id}_${current.key}`);

      console.log(schedule.scheduledJobs);

      await interaction.reply("STOP!");
    } catch (error) {
      console.error(error);
    }
  },
};
