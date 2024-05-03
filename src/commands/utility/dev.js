import { SlashCommandBuilder } from "discord.js";

export default {
  data: new SlashCommandBuilder()
    .setName("dev")
    .setDescription("Tools for the developer. Player no touch!!")
    .addStringOption((option) =>
      option
        .setName("tools")
        .setDescription("Tools")
        .setRequired(true)
        .addChoices(
          { name: "map", value: "tool_map" },
          { name: "boat", value: "tool_boat" },
        ),
    ),

  async execute(interaction) {
    console.log(interaction.options.getString("tools"));
    switch (interaction.options.getString("tools")) {
      case "tool_map":
        console.log("Mapping");
        break;
    }
    await interaction.reply("lol");
  },
};
