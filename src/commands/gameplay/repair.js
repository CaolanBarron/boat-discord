const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("repair")
    .setDescription("Repair and maintain the boat. Repair++"),
  async execute(interaction) {
    await interaction.reply("Repair");
  },
};
