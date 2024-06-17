import ActivityService from '../ActivityService.js';
import SkillService from '../SkillService.js';
import db from '../../../database/database.js';
import BotService from '../BotService.js';
import { EmbedBuilder } from 'discord.js';
import MapService from '../MapService.js';
import Activity from '../Activity.js';

class CartographyService extends Activity {
    async start(guildId, player) {
        const isBusy = ActivityService.checkActive(player.id, 'CARTOGRAPHY');
        if (isBusy) {
            return {
                content: isBusy,
                ephemeral: true,
            };
        }

        const isOccupied = await ActivityService.checkOccupied(
            'CARTOGRAPHY',
            guildId
        );
        if (isOccupied) {
            return {
                content: isOccupied,
                ephemeral: true,
            };
        }

        const stmt = db().prepare(
            'INSERT INTO active_tags(key, player_id) VALUES(?, ?)'
        );
        stmt.run('CARTOGRAPHY', player.id);

        await ActivityService.scheduleActivity('CARTOGRAPHY', {
            guildId,
            player,
        });

        // TODO: CARTOGRAPHY response
        return {
            content: `${player.name} gathers all the geographical documents they can find. Equipped with a compass and a planimeter they begin to study...`,
            ephemeral: false,
        };
    }

    async endJob(guildId, player) {
        try {
            const stmt = db().prepare(
                'DELETE FROM active_tags WHERE player_id = ? AND key = ?'
            );
            stmt.run(player.id, 'CARTOGRAPHY');

            await SkillService.addRandomXP(player.id, 'CARTOGRAPHY', 4);

            // Decide randomly what information to give
            // - Biomes
            // - Land
            // - Location
            // - nothing
            const discovery = await MapService.randomDiscovery(
                guildId,
                player.id
            );

            return discovery;
        } catch (error) {
            console.error(error);
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

        const cartographyEmbed = new EmbedBuilder()
            .setColor(0x0077be)
            .setTitle(`${interaction.player.name} has finished Mapping!`)
            .setDescription('I wonder what they discovered...')
            .addFields(
                { name: 'Discoveries:', value: results },
                { name: 'Experience:', value: '++Cartography' }
            );

        foghorn.send({ embeds: [cartographyEmbed] });
    }

    async getTimeToExecute(boatId) {
        // Check if there are any cartography timing effects
        const stmt = db()
            .prepare(
                `
              SELECT * 
              FROM boat_effect be 
              JOIN effect e ON be.effect_id = e.id
              WHERE be.boat_id = ?
              AND e.key = ?`
            )
            .all(boatId, 'CARTOGRAPHY_TIME');
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
        console.log(`Cartography event started for: ${finalTime}`);
        return finalTime;
    }
}

export default new CartographyService();
