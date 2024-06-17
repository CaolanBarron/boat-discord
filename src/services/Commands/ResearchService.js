import ActivityService from '../ActivityService.js';
import SkillService from '../SkillService.js';
import db from '../../../database/database.js';
import BotService from '../BotService.js';
import { EmbedBuilder } from 'discord.js';
import { stripIndent } from 'common-tags';
import ItemService from '../ItemService.js';
import { chooseRandomRarity, getRarityEffectModifer } from '../utils.js';
import Activity from '../Activity.js';

class ResearchService extends Activity {
    async start(guildId, player, itemId) {
        const isBusy = ActivityService.checkActive(player.id, 'RESEARCH');
        if (isBusy) {
            return {
                content: isBusy,
                ephemeral: true,
            };
        }

        const isOccupied = await ActivityService.checkOccupied(
            'RESEARCH',
            guildId
        );
        if (isOccupied) {
            return {
                content: isOccupied,
                ephemeral: true,
            };
        }

        // Check if  the itemId is incorrectly formatted

        let item;
        if (itemId) {
            if (!Number.parseInt(itemId)) {
                return {
                    content: 'The item ID is not in the correct format',
                    ephemeral: true,
                };
            }

            item = db()
                .prepare(
                    `SELECT boat_inventory.*, item.name, player.name AS locker_name 
          FROM boat_inventory 
          LEFT JOIN player on boat_inventory.locked_by = player.id
          JOIN item ON boat_inventory.item_key = item.key 
          WHERE boat_inventory.id = ?`
                )
                .get(itemId);

            if (!item) {
                return {
                    content:
                        'This item does not exist. Make sure you are using the correct ID.',
                    ephemeral: true,
                };
            }
            if (item.locked_by) {
                return {
                    content: `This item is already in use by ${item.locker_name}.`,
                    ephemeral: true,
                };
            }

            // Lock the item from use by other players
            await db()
                .prepare('UPDATE boat_inventory SET locked_by = ? WHERE id = ?')
                .run(player.id, itemId);
        }

        const stmt = db().prepare(
            'INSERT INTO active_tags(key, player_id) VALUES(?, ?)'
        );
        stmt.run('RESEARCH', player.id);

        await ActivityService.scheduleActivity('RESEARCH', { guildId, player });

        if (itemId) {
            return {
                content: `${player.name} takes to the research table. Todays specimen: ${item.name}. Inspection begins...`,
                ephemeral: false,
            };
        } else {
            return {
                content: `${player.name} decides to take some samples of the surrounding area. Inspection begins...`,
                ephemeral: false,
            };
        }
    }

    async endJob(guildId, player) {
        try {
            const stmt = db().prepare(
                'DELETE FROM active_tags WHERE player_id = ? AND key = ?'
            );
            stmt.run(player.id, 'RESEARCH');

            // Check if the player is locking an item.
            const item = db()
                .prepare(
                    `SELECT * FROM boat_inventory JOIN item ON item_key = key WHERE locked_by = ?`
                )
                .get(player.id);
            // If they are then do an item action and unlock the item
            let response;
            if (item) {
                response = {
                    description: `Examination of the ${item.name} has concluded...`,
                    content: await this.researchItem(item, player),
                };
            } else {
                // If not then check the players current biome and do a biome action
                response = {
                    description: `Examination of the surrounding area has concluded...`,
                    content: await this.researchBiome(guildId),
                };
            }
            await SkillService.addRandomXP(player.id, 'RESEARCH', 4);

            return response;
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
            .setTitle(`${interaction.player.name} has finished researching!`)
            .setDescription(results.description)
            .addFields(
                { name: 'Findings:', value: results.content },
                { name: 'Experience:', value: '++Research' }
            );

        foghorn.send({ embeds: [cartographyEmbed] });
    }

    async researchItem(item, player) {
        db()
            .prepare(
                `UPDATE boat_inventory SET locked_by = ? WHERE locked_by = ?`
            )
            .run(null, player.id);

        // Two options: transform the item or deliver information about the item
        if (Math.random() < 0.7) {
            const skillXp = await SkillService.getSkillXP(
                player.id,
                'RESEARCH'
            );
            const skillLevel = await SkillService.getCurrentLevel(skillXp);

            const rarityModfier = getRarityEffectModifer(
                player.boat_id,
                'TRANSFORMATION'
            );
            const rarity = chooseRandomRarity(
                ItemService.rarities,
                skillLevel,
                rarityModfier
            );
            const transformations = db()
                .prepare(
                    `SELECT * 
                    FROM item_transformation 
                    JOIN item ON item.key = transformation 
                    WHERE original = ? AND item_transformation.rarity = ?`
                )
                .all(item.key, rarity);

            if (transformations.length === 0)
                return stripIndent`Some information has been revealed about this item...\n ${await ItemService.itemInfo(
                    item.key
                )}`;

            const chosenItem =
                transformations[
                    Math.floor(Math.random() * transformations.length)
                ];

            db()
                .prepare(`UPDATE boat_inventory SET item_key = ? WHERE id = ?`)
                .run(chosenItem.key, item.id);

            return `Hmmm science can be very strange...\nThe ${item.name} has been transformed into a ${chosenItem.name}`;
        } else {
            return stripIndent`Some information has been revealed about this item...\n ${await ItemService.itemInfo(
                item.key
            )}`;
        }
    }

    async researchBiome(guildId) {
        const boat = db()
            .prepare(`SELECT * FROM BOAT WHERE id = ?`)
            .get(guildId);
        const currentBiome = db()
            .prepare(
                `SELECT * FROM biome_coords JOIN biomes ON biome_coords.biome_key = biomes.key WHERE x_coord = ? and y_coord = ?`
            )
            .get(boat.x_coord, boat.y_coord);

        if (currentBiome) return currentBiome.info;
        // TODO: change all of the following wtf
        const openOceanInfos = [
            'The Mariana Trench is the deepest part of the ocean, reaching a depth of over 36,000 feet.',
            "Approximately 70% of the Earth's surface is covered by the ocean, making it the largest habitat on Earth.",
            'The ocean contains an estimated 20 million tons of gold.',
            'More than 80% of the ocean is unexplored and unmapped.',
            'The blue whale is the largest animal to have ever lived on Earth, and it can be found in various oceans around the world.',
            'The Great Barrier Reef is the largest living structure on Earth, stretching over 1,400 miles.',
            "The ocean produces over 50% of the world's oxygen and absorbs about 30% of carbon dioxide produced by humans.",
            'There are over 20 million tons of unexploded bombs, shells, and chemical weapons lying on the ocean floor from past wars.',
            "The deepest recorded dive by a marine mammal was made by a Cuvier's beaked whale, reaching depths of nearly 10,000 feet.",
            'The ocean is home to the longest mountain range in the world, the Mid-Ocean Ridge, which stretches over 40,000 miles.',
            "The ocean's deepest point, the Challenger Deep, is located in the Mariana Trench and is deeper than Mount Everest is tall.",
            'Over 90% of volcanic activity on Earth occurs in the ocean.',
            'The ocean is home to an estimated 2 million species, but many remain undiscovered and unnamed.',
            'The Titanic wreckage lies at a depth of about 12,500 feet in the North Atlantic Ocean.',
            'Some species of jellyfish are considered immortal, as they can revert back to their juvenile stage after reaching adulthood.',
            "The ocean's saltiness comes from the erosion of rocks on land, which release minerals and salts into the water through rivers and streams.",
            'The Pacific Ocean is the largest and deepest ocean on Earth, covering more than 60 million square miles.',
            "The ocean's tides are primarily caused by the gravitational pull of the moon.",
            'Some deep-sea fish produce their own light through a process called bioluminescence, which they use for camouflage, attracting prey, or communicating.',
            "The ocean's average depth is around 12,080 feet, but this can vary greatly depending on location.",
        ];
        return openOceanInfos[
            Math.floor(Math.random() * openOceanInfos.length)
        ];
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
        console.log(stmt);
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
export default new ResearchService();
