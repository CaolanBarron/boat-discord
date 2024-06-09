import { SlashCommandBuilder } from 'discord.js';

export default {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Display helpful information about the game')
        .addStringOption((option) =>
            option
                .setName('topic')
                .setDescription(
                    'Information about a particular part of the game '
                )
                .addChoices({ name: 'Activities', value: 'topic_activities' })
        ),
    async execute(interaction) {
        await interaction.reply(`Helpful information lol`);
    },
};
