const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("research")
    .setDescription("Research biological matter. Lab++")
    .addStringOption((option) =>
      option.setName("item").setDescription("Item from inventory to research")
    ),
  async execute(interaction) {
    await interaction.reply("RESEARCH");
  },
};
