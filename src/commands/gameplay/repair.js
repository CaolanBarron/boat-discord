import { SlashCommandBuilder } from 'discord.js';
import RepairService from '../../services/Commands/RepairService.js';

export default {
    data: new SlashCommandBuilder()
        .setName('repair')
        .setDescription('Repair and maintain the boat. Repair++'),
    async execute(interaction) {
        try {
            const repairResult = await RepairService.start(
                interaction.guildId,
                interaction.player,
            );

            await interaction.reply(repairResult);
        } catch (error) {
            console.error(error);
        }
    },
};
