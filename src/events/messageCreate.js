import { Events } from 'discord.js';
import FlavorService from '../services/FlavorService.js';
import db from '../../database/database.js';

export default {
    name: Events.MessageCreate,
    async execute(interaction) {
        try {
            // Check if the channel is correct and that the message was not sent by this bot
            if (
                interaction.channel.name !== process.env.GAMEPLAYCHANNEL ||
                interaction.author.username === process.env.BOTNAME
            )
                return;

            const user = db()
                .prepare(
                    'SELECT * FROM player WHERE user_id = ? AND boat_id = ?'
                )
                .get(interaction.author.id, interaction.guildId);

            if (!user) {
                const guild = db()
                    .prepare('SELECT * FROM boat WHERE id = ?')
                    .get(interaction.guildId);
                const error = new Error();
                if (!guild) {
                    error.message = 'This server does not have a boat present.';
                } else {
                    error.message =
                        'You do not have a character at the moment. Use the `/create` command.';
                }
                throw error;
            }

            const characterName = user.name;
            const message = FlavorService.getPlayerFlavor(
                interaction.content,
                characterName
            );

            interaction.channel.send(message);
            interaction.delete();
        } catch (error) {
            console.error(error.message);
            await interaction.reply({
                content: error.message,
                ephemeral: true,
            });
        }
    },
};
