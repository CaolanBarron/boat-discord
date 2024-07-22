import { SlashCommandBuilder } from 'discord.js';
import ResearchService from '../../services/Commands/ResearchService.js';

export default {
    data: new SlashCommandBuilder()
        .setName('research')
        .setDescription('Research biological matter. Lab++')
        .addStringOption((option) =>
            option
                .setName('item')
                .setDescription('Item from inventory to research'),
        ),
    async execute(interaction) {
        try {
            const researchResult = await ResearchService.start(
                interaction.guildId,
                interaction.player,
                interaction.options.getString('item'),
            );

            await interaction.reply(researchResult);
        } catch (error) {
            console.error(error);
        }
    },
};
