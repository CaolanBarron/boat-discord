import { SlashCommandBuilder } from 'discord.js';
import ItemService from '../../services/ItemService.js';

export default {
    data: new SlashCommandBuilder()
        .setName('item')
        .setDescription('Interact with a specific item in The Boats inventory')
        .addStringOption((option) =>
            option
                .setName('action')
                .setDescription('What would you like to do with the item?')
                .setRequired(true)
                .addChoices(
                    { name: 'use', value: 'item_use' },
                    { name: 'inspect', value: 'item_inspect' },
                    { name: 'dispose', value: 'item_dispose' },
                ),
        )
        .addStringOption((option) =>
            option
                .setName('item-id')
                .setDescription(
                    'The ID of the item you would like to interct with',
                )
                .setRequired(true),
        ),

    async execute(interaction) {
        try {
            // TODO: Beware of SQL injection on the itemID validate it

            const itemId = interaction.options.getString('item-id');
            let result;
            switch (interaction.options.getString('action')) {
                case 'item_use':
                    result = await ItemService.useItem(
                        interaction.player,
                        itemId,
                    );
                    break;
                case 'item_dispose':
                    result = await ItemService.disposeItem(
                        interaction.player.boat_id,
                        itemId,
                    );
                    break;
                case 'item_inspect':
                    result = await ItemService.inspectItem(
                        interaction.player.boat_id,
                        itemId,
                    );
                    break;
            }

            if (!result) throw new Error('Invalid item command');

            await interaction.reply(result);
        } catch (error) {
            console.error(error);
        }
    },
};
