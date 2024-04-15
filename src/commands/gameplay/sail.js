const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("sail")
    .setDescription("Sail in a direction. Sail++")
    .addStringOption((option) =>
      option
        .setName("direction")
        .setDescription("Where shall we sail?")
        .setRequired(true)
        .addChoices(
          { name: "North", value: "north" },
          { name: "East", value: "east" },
          { name: "South", value: "south" },
          { name: "West", value: "west" }
        )
    ),
  async execute(interation) {
    await interation.reply(interation.options.getString("direction"));
  },
};
