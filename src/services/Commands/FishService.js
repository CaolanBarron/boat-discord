import db from '../../../database/database.js';
import ActivityService from '../../services/ActivityService.js';
import Activity from '../Activity.js';
import SkillService from '../SkillService.js';
import ItemService from '../ItemService.js';
import BotService from '../BotService.js';
import { EmbedBuilder } from 'discord.js';
import { getRarityEffectModifer } from '../utils.js';

class FishService extends Activity {
    async start(guildId, player) {
        const isBusy = ActivityService.checkActive(player.id, 'FISH');
        if (isBusy) {
            return {
                content: isBusy,
                ephemeral: true,
            };
        }

        const isOccupied = await ActivityService.checkOccupied('FISH', guildId);
        if (isOccupied) {
            return {
                content: isOccupied,
                ephemeral: true,
            };
        }

        const stmt = db().prepare(
            'INSERT INTO active_tags(key, player_id) VALUES(?, ?)'
        );
        stmt.run('FISH', player.id);

        await ActivityService.scheduleActivity('FISH', { guildId, player });

        return {
            content: `${player.name} has taken the fishing rod and cast it into the water, they wait patiently...`,
            ephemeral: false,
        };
    }

    async endJob(guildId, player) {
        try {
            const stmt = db().prepare(
                'DELETE FROM active_tags WHERE player_id = ? AND key = ?'
            );
            stmt.run(player.id, 'FISH');

            await SkillService.addRandomXP(player.id, 'FISH', 4);

            const skillXP = await SkillService.getSkillXP(player.id, 'FISH');
            const skillLevel = await SkillService.getCurrentLevel(skillXP);

            const effectModifier = getRarityEffectModifer(guildId, 'FISH');
            const catches = await ItemService.randomItemByLootTag(
                'FISH',
                skillLevel,
                effectModifier
            );

            await ItemService.addToInventory(guildId, catches.key, player.id);

            return catches;
        } catch (error) {
            console.error(error);
        }
    }

    async announceEnd(interaction) {
        const catches = await this.endJob(
            interaction.guildId,
            interaction.player
        );

        const foghorn = await BotService.getChannelByName(
            interaction.guildId,
            process.env.NOTICHANNEL
        );

        const fishEmbed = new EmbedBuilder()
            .setColor(0x0077be)
            .setTitle(`${interaction.player.name} has finished Fishing!`)
            .setDescription('I wonder what they caught...')
            .addFields(
                {
                    name: 'Caught:',
                    value: `${catches.name}\n${catches.description}`,
                },
                { name: 'Experience:', value: '++Fishing' }
            );

        foghorn.send({ embeds: [fishEmbed] });
    }

    async getTimeToExecute(boatId) {
        // Check if there are any fish timing effects
        const stmt = db()
            .prepare(
                `
              SELECT * 
              FROM boat_effect be 
              JOIN effect e ON be.effect_id = e.id
              WHERE be.boat_id = ?
              AND e.key = ?`
            )
            .all(boatId, 'FISH_TIME');
        let finalTime = this.executionTime;
        const timeModification = 200_000;
        //
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
export default new FishService();
