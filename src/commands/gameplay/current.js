import { SlashCommandBuilder } from "discord.js";

export default {
  data: new SlashCommandBuilder()
    .setName("current")
    .setDescription("Check what your character is currently doing."),
  async execute(interaction) {
    await interaction.reply(
      `${interaction.player.name} is not doing anything.`,
    );
  },
};
