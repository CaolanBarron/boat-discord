import { SlashCommandBuilder } from 'discord.js';
import ItemService from '../../services/ItemService.js';

export default {
    data: new SlashCommandBuilder()
        .setName('inventory')
        .setDescription('Display the current boats inventory'),
    async execute(interaction) {
        try {
            const inventoryResult = await ItemService.displayInventory(
                interaction.guildId
            );

            // FIXME: This will fail if a boat has more than 300 items in the inventroy
            // Maybe limit this to 150 and use pagination
            await interaction.reply({
                embeds: [inventoryResult],
                ephemeral: true,
            });
        } catch (error) {
            console.error(error);
        }
    },
};
