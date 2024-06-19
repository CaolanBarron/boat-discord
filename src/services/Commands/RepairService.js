import ActivityService from '../ActivityService.js';
import SkillService from '../SkillService.js';
import BotService from '../BotService.js';
import { EmbedBuilder } from '@discordjs/builders';
import db from '../../../database/database.js';
import EffectService from '../EffectService.js';
import Activity from '../Activity.js';

class RepairService extends Activity {
    async start(guildId, player) {
        const isBusy = ActivityService.checkActive(player.id, 'REPAIR');
        if (isBusy) {
            return {
                content: isBusy,
                ephemeral: true,
            };
        }

        const isOccupied = await ActivityService.checkOccupied(
            'REPAIR',
            guildId
        );
        if (isOccupied) {
            return {
                content: isOccupied,
                ephemeral: true,
            };
        }

        const insertStmt = db().prepare(
            'INSERT INTO active_tags(key, player_id) VALUES(?,?)'
        );
        insertStmt.run('REPAIR', player.id);

        await ActivityService.scheduleActivity('REPAIR', { guildId, player });

        return {
            content: `${player.name} unhooks the latches of their toolbox and gets to work.`,
            ephemeral: false,
        };
    }

    async endJob(guildId, player) {
        try {
            const stmt = db().prepare(
                'DELETE FROM active_tags WHERE player_id = ? AND key = ?'
            );
            stmt.run(player.id, 'REPAIR');

            await SkillService.addRandomXP(player.id, 'REPAIR', 4);

            const activeDebuffs = await EffectService.findBoatDebuffs(guildId);

            if (activeDebuffs.length > 0) {
                const toRemove =
                    activeDebuffs[
                        Math.floor(Math.random() * activeDebuffs.length)
                    ];
                db()
                    .prepare(
                        'DELETE FROM boat_effect WHERE boat_id = ? AND effect_id = ?'
                    )
                    .run(guildId, toRemove.effect_id);
                return {
                    content:
                        'An issue found and an issue fixed, The Boat has been repaired somewhat.',
                    modifications: `${toRemove.name} debuff removed.`,
                };
            }

            const skillXp = await SkillService.getSkillXP(player.id, 'REPAIR');
            const skillLevel = await SkillService.getCurrentLevel(skillXp);

            const buffToApply =
                await EffectService.getPositiveWeightedRandom(skillLevel);

            await EffectService.applyEffect(guildId, buffToApply.id);

            return {
                content: `Why did they place this gear here? What on earth is the function of this pipe?? The Boat's faculties has been improved.`,
                modifications: `${buffToApply.name} buff applied.`,
            };
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async announceEnd(interaction) {
        const results = await this.endJob(
            interaction.guildId,
            interaction.player
        );

        const foghorn = await BotService.getChannelByName(
            interaction.guildId,
            process.env.NOTICHANNEL
        );

        const repairEmbed = new EmbedBuilder()
            .setColor(0x0077be)
            .setTitle(`${interaction.player.name} has finished their repairs!`)
            .setDescription('The fixes look stable enough')
            .addFields(
                {
                    name: 'Effects:',
                    value: `${results.content}`,
                },
                { name: 'Modification:', value: results.modifications },
                { name: 'Experience:', value: '++Repair' }
            );

        foghorn.send({ embeds: [repairEmbed] });
    }
    async getTimeToExecute(boatId) {
        // Check if there are any repair timing effects
        const stmt = db()
            .prepare(
                `
              SELECT * 
              FROM boat_effect be 
              JOIN effect e ON be.effect_id = e.id
              WHERE be.boat_id = ?
              AND e.key = ?`
            )
            .all(boatId, 'REPAIR_TIME');
        let finalTime = this.executionTime;
        const timeModification = 200_000;

        // if there is a negative one increase time
        if (stmt.find((f) => f.type === 'DEBUFF')) {
            finalTime += timeModification;
        }

        // if there is a positive on decrease time
        if (stmt.find((f) => f.type === 'BUFF')) {
            finalTime -= timeModification;
        }
        if (finalTime < 0) throw new Error('Activity timing is well off');
        return finalTime;
    }
}

export default new RepairService();
