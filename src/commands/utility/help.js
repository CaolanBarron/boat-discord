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
                .addChoices({ name: 'Events', value: 'topic_events' })
                .addChoices({ name: 'Items', value: 'topic_items' })
                .addChoices({ name: 'World', value: 'topic_world' })
                .addChoices({ name: 'World', value: 'topic_world' })
                .addChoices({ name: 'The Boat', value: 'topic_boat' })
                .addChoices({ name: 'Fishing', value: 'topic_fishing' })
                .addChoices({ name: 'Cartography', value: 'topic_cartography' })
                .addChoices({ name: 'Repair', value: 'topic_repair' })
                .addChoices({ name: 'Research', value: 'topic_research' })
                .addChoices({ name: 'Sailing', value: 'topic_sailing' })
                .addChoices({ name: 'Salvage', value: 'topic_salvage' })
        ),
    async execute(interaction) {
        await interaction.reply(`Helpful information lol`);
    },
};
