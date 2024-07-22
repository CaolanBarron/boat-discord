import { SlashCommandBuilder } from 'discord.js';
import schedule from 'node-schedule';
import db from '../../../database/database.js';
import ActivityService from '../../services/ActivityService.js';

export default {
    data: new SlashCommandBuilder()
        .setName('stop')
        .setDescription('Stops whatever activity you are doing'),
    async execute(interaction) {
        try {
            const current = ActivityService.getCurrent(interaction.player.id);

            if (!current) {
                await interaction.reply({
                    content: `${interaction.player.name} is not doing anything to stop at the moment`,
                    ephemeral: true,
                });
                return;
            }

            if (current.key === 'RESEARCH') {
                db()
                    .prepare(
                        'UPDATE boat_inventory SET locked_by = ? WHERE locked_by = ?',
                    )
                    .run(null, interaction.player.id);
            }

            // Delete the active_tag from the database
            const tagsStmt = db().prepare(
                'DELETE FROM active_tags WHERE key = ? AND player_id = ?',
            );
            tagsStmt.run(current.key, interaction.player.id);

            if (
                [
                    'NORTH_SAILING',
                    'SOUTH_SAILING',
                    'EAST_SAILING',
                    'WEST_SAILING',
                ].includes(current.key)
            ) {
                const sailingActivities = db()
                    .prepare(
                        `
                  SELECT * 
                  FROM active_tags 
                  JOIN player ON active_tags.player_id = player.id 
                  WHERE player.id = ? 
                  AND active_tags.key 
                    IN (
                      'NORTH_SAILING', 
                      'SOUTH_SAILING', 
                      'EAST_SAILING', 
                      'WEST_SAILING'
                    )`,
                    )
                    .all(interaction.player.id);

                if (sailingActivities.length === 0) {
                    // Need to get playrIds because they are decoupled from scheduled jobs
                    const playerIds = db()
                        .prepare('SELECT id FROM player WHERE boat_id = ?')
                        .all(interaction.player.id);

                    const activityNames = playerIds.map(
                        (id) => `activity_${current.key}_${id}`,
                    );

                    activityNames.forEach((jobName) =>
                        schedule.cancelJob(jobName),
                    );

                    // TODO: need to account for The main person stopping while others are still sailing
                }
            } else {
                // Delete the current job
                schedule.cancelJob(
                    `activity_${current.key}_${interaction.player.id}`,
                );
            }

            const result = ActivityService.stopPhrase(
                current.key,
                interaction.player.name,
            );

            await interaction.reply(result);
        } catch (error) {
            console.error(error);
        }
    },
};
