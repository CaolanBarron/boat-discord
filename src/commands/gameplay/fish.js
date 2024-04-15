const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("fish")
    .setDescription(
      "Cast your rod and fish for a while. Fishing++ (10 minutes)"
    ),
  async execute(interaction) {
    await interaction.reply("Fish!");
  },
};
