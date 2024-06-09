import { SlashCommandBuilder } from 'discord.js';
import CartographyService from '../../services/Commands/CartographyService.js';

export default {
    data: new SlashCommandBuilder()
        .setName('map')
        .setDescription('Draw and decipher maps. Cartography++'),
    async execute(interaction) {
        try {
            const cartographyResult = await CartographyService.start(
                interaction.guildId,
                interaction.player
            );
            await interaction.reply(cartographyResult);
        } catch (error) {
            console.error(error);
        }
    },
};
