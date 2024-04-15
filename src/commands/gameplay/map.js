const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("map")
    .setDescription("Draw and decipher maps. Cartography++"),
  async execute(interaction) {
    await interaction.reply("Map!");
  },
};
