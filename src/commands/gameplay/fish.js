import { SlashCommandBuilder } from "discord.js";

import FishService from "../../services/Commands/FishService.js";

export default {
  data: new SlashCommandBuilder()
    .setName("fish")
    .setDescription(
      "Cast the only fishing rod and fish for a while. Fishing++ (10 minutes)"
    ),
  async execute(interaction) {
    try {
      const fishResult = await FishService.start(
        interaction.guildId,
        interaction.player
      );

      await interaction.reply(fishResult);
    } catch (error) {
      console.error(error);
    }
  },
};
