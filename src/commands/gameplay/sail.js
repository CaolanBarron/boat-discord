import { SlashCommandBuilder } from "discord.js";
import SailService from "../../services/Commands/SailService.js";

export default {
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
  async execute(interaction) {
    try {
      const sailResult = await SailService.start(
        interaction.guildId,
        interaction.player
      );

      await interaction.reply(sailResult);
    } catch (error) {
      console.error(error);
    }
  },
};
