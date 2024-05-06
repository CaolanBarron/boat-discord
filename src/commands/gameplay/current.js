import { SlashCommandBuilder } from "discord.js";
import ActivityService from "../../services/ActivityService.js";

export default {
  data: new SlashCommandBuilder()
    .setName("current")
    .setDescription("Check what your character is currently doing."),
  async execute(interaction) {
    const content = await ActivityService.checkCurrent(interaction.player);
    await interaction.reply({ content, ephemeral: true });
  },
};
