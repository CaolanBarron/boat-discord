const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("stop")
    .setDescription("Stops whatever activity you are doing"),
  async execute(interaction) {
    await interaction.reply("STOP!");
  },
};
