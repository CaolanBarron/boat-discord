import { SlashCommandBuilder } from "discord.js";
import schedule from "node-schedule";
import db from "../../../database/database.js";
import ActivityService from "../../services/ActivityService.js";

export default {
  data: new SlashCommandBuilder()
    .setName("stop")
    .setDescription("Stops whatever activity you are doing"),
  async execute(interaction) {
    try {
      const current = ActivityService.getCurrent(interaction.player.id);

      if (!current) {
        await interaction.reply({
          content: `${interaction.player.name} is not doing anything to stop at the moment`,
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

      const result = ActivityService.stopPhrase(
        current.key,
        interaction.player.name
      );

      await interaction.reply(result);
    } catch (error) {
      console.error(error);
    }
  },
};
