import {
    Events,
    AttachmentBuilder,
    EmbedBuilder,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
    Colors,
} from 'discord.js';
import db from '../../database/database.js';
import PromptService from '../services/PromptService.js';

export default {
    name: Events.InteractionCreate,
    async execute(interaction) {
        try {
            const user = db()
                .prepare(
                    'SELECT * FROM player WHERE user_id = ? AND boat_id = ?'
                )
                .get(interaction.user.id, interaction.guildId);
            interaction.player = user;

            if (interaction.isButton() && interaction.customId) {
                // Need to recreate the action row with the buttons disabled and then edit the message immediately
                const customId = interaction.customId.split('_');

                const message = interaction.message;
                const components = message.components[0].components;

                const row = new ActionRowBuilder();

                for (const button of components) {
                    const newButton = new ButtonBuilder()
                        .setCustomId(button.data.custom_id)
                        .setLabel(button.data.label)
                        .setStyle(ButtonStyle.Primary)
                        .setDisabled(true);
                    row.addComponents(newButton);
                }

                if (customId[0] === 'prompt') {
                    // Remove the prompt if it is too old
                    const timePassed =
                        Date.now() - interaction.message.createdTimestamp;

                    if (timePassed / 1000 > 180) {
                        await message.edit({
                            content:
                                'The time for this event has long passed...',
                            embeds: [],
                            components: [],
                        });
                        return;
                    }
                    await message.edit({
                        content: message.content,
                        components: [row],
                    });

                    const actionResponse = await PromptService.chooseAction(
                        customId[1],
                        user,
                        interaction.guildId
                    );

                    const outcome =
                        actionResponse.outcome_type === 'SUCCESS'
                            ? { color: Colors.Green }
                            : { color: Colors.Red };

                    const embed = new EmbedBuilder()
                        .setTitle(`${user.name} decided to take action`)
                        .setDescription(actionResponse.content)
                        .setColor(outcome.color);

                    await interaction.reply({ embeds: [embed] });
                }
            }

            if (!interaction.isChatInputCommand()) return;

            if (!user) {
                const guild = db()
                    .prepare('SELECT * FROM boat WHERE id = ?')
                    .get(interaction.guildId);
                const error = new Error();
                if (!guild) {
                    error.message =
                        interaction.commandName === 'dev'
                            ? 'IGNORE'
                            : 'This server does not have a boat present.';
                } else {
                    error.message =
                        interaction.commandName === 'create'
                            ? 'IGNORE'
                            : 'You do not have a character at the moment. Use the `/create` command.';
                }
                if (error.message !== 'IGNORE') throw error;
            }

            if (
                interaction.channel.name !== process.env.GAMEPLAYCHANNEL &&
                interaction.commandName !== 'dev'
            ) {
                const file = new AttachmentBuilder('src/assets/landlubber.jpg');
                const embed = new EmbedBuilder()
                    .setTitle('Landlubber')
                    .setImage('attachment://landlubber.jpg');
                await interaction.reply({ embeds: [embed], files: [file] });
                return;
            }
            const command = interaction.client.commands.get(
                interaction.commandName
            );
            if (!command) {
                console.error(
                    `No command matching ${interaction.commandName} was found.`
                );
                return;
            }

            await command.execute(interaction);
        } catch (error) {
            console.error(error);
            if (interaction.replied || interaction.deferred) {
                await interaction.followUp({
                    content: error.message,
                    ephemeral: true,
                });
            } else {
                await interaction.reply({
                    content: error.message,
                    ephemeral: true,
                });
            }
        }
    },
};
