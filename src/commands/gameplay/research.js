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
    // TODO: Need to save additional data for Object researching 😭
    // TODO: Need to put a lock on the object being researched💀
    const stmt = db.prepare(
      "INSERT INTO active_tags(key, player_relation) VALUES(?, ?)"
    );
    stmt.run("RESEARCH", interaction.player.id);

    ActivityService.scheduleActivity("RESEARCH", interaction);

    await interaction.reply("Research!");
  },
};
