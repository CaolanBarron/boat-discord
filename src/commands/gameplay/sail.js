import { SlashCommandBuilder } from 'discord.js';
import SailService from '../../services/Commands/SailService.js';

export default {
    data: new SlashCommandBuilder()
        .setName('sail')
        .setDescription('Sail in a direction. Sail++')
        .addStringOption((option) =>
            option
                .setName('direction')
                .setDescription('Where shall we sail?')
                .addChoices(
                    { name: 'North', value: 'NORTH' },
                    { name: 'East', value: 'EAST' },
                    { name: 'South', value: 'SOUTH' },
                    { name: 'West', value: 'WEST' }
                )
        ),
    async execute(interaction) {
        try {
            const sailResult = await SailService.start(
                interaction.guildId,
                interaction.player,
                interaction.options.getString('direction')
            );

            await interaction.reply(sailResult);
        } catch (error) {
            console.error(error);
        }
    },
};
