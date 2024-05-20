import { SlashCommandBuilder } from "discord.js";
import ItemService from "../../services/ItemService.js";

export default {
  data: new SlashCommandBuilder()
    .setName("inventory")
    .setDescription("Display the current boats inventory"),
  async execute(interaction) {
    try {
      const inventoryResult = ItemService.displayInventory(interaction.guildId);

      await interaction.reply({ embeds: [inventoryResult] });
    } catch (error) {
      console.error(error);
    }
  },
};
