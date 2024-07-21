import { SlashCommandBuilder } from 'discord.js';

import SalvageService from '../../services/Commands/SalvageService.js';

// TODO: item that is consumed
export default {
    data: new SlashCommandBuilder()
        .setName('salvage')
        .setDescription(
            'Lower the hook and attempt to fish out some treasure, Consume 1 {}'
        ),
    async execute(interaction) {
        try {
            const salvageResult = await SalvageService.salvage(
                interaction.guildId,
                interaction.player
            );

            await interaction.reply(salvageResult);
        } catch (e) {
            console.error(e);
        }
    },
};
