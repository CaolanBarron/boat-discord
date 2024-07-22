import db from '../../database/database.js';
import BoatService from './BoatService.js';
import ItemService from './ItemService.js';
import { chooseRandomRarity, sqlPlaceholder } from './utils.js';
import SkillService from './SkillService.js';
import EffectService from './EffectService.js';

class MapService {
    constructor() {
        this.rarities = {
            BIOME: 55,
            // LAND: 25,
            TREASURE: 40,
            NOTHING: 5,
        };
    }

    async randomDiscovery(guildId, playerId) {
        const choice = await chooseRandomRarity(this.rarities);
        switch (choice) {
            case 'BIOME':
                return await this.nearbyBiome(guildId);
            case 'LAND':
                return 'TODO land creation';
            case 'TREASURE':
                return await this.nearbyTreasure(guildId, playerId);
            case 'NOTHING':
                return 'Unfortunately this time they could not divine anything from the blasted documents.';
            default:
                throw new Error(`This key ${choice} does not exist`);
        }
    }

    async nearbyBiome(guildId) {
        const boatStmt = db()
            .prepare('SELECT x_coord, y_coord FROM boat WHERE id = ?')
            .get(guildId);

        const xRange = this.range(10, boatStmt.x_coord - 5);
        const yRange = this.range(10, boatStmt.y_coord - 5);

        const biomeSurroundingStmt = db()
            .prepare(
                `SELECT * FROM biome_coords 
                WHERE x_coord = ? AND y_coord IN ${sqlPlaceholder(
                    yRange.length,
                )} 
                OR y_coord = ? AND x_coord IN ${sqlPlaceholder(xRange.length)}`,
            )
            .all(boatStmt.x_coord, yRange, boatStmt.y_coord, xRange);

        if (biomeSurroundingStmt.length === 0) {
            return 'Unfortunately this time they could not divine anything from the blasted documents.';
        }
        const randomBiome =
            biomeSurroundingStmt[
                Math.floor(Math.random() * biomeSurroundingStmt.length)
            ];

        const currentBiome = BoatService.currentBiome(guildId);
        if (currentBiome && currentBiome.biome_key === randomBiome.biome_key) {
            return 'Unfortunately this time they could not divine anything from the blasted documents.';
        }

        let directions = ['North', 'South', 'West', 'East'];
        const biomeDirection = [];
        // Find out what direction the biome is in.
        if (boatStmt.x_coord === randomBiome.x_coord) {
            if (boatStmt.y_coord < randomBiome.y) {
                directions = directions.filter((i) => i !== 'South');
                biomeDirection.push('South');
            } else {
                directions = directions.filter((i) => i !== 'North');
                biomeDirection.push('North');
            }
        } else if (boatStmt.x_coord > randomBiome.x_coord) {
            directions = directions.filter((i) => i !== 'West');
            biomeDirection.push('West');
        } else {
            directions = directions.filter((i) => i !== 'East');
            biomeDirection.push('East');
        }
        // Choose a random direction other than the chosen one
        biomeDirection.push(
            directions[Math.floor(Math.random() * directions.length)],
        );
        const randomTimes = Math.floor(Math.random() * 2);
        for (let i = 0; i < randomTimes; i++) {
            const removedValue = biomeDirection.shift();
            biomeDirection.push(removedValue);
        }

        // Return the string with the directions in a random order
        switch (randomBiome.biome_key) {
            case 'SWAMP':
                return `Some of the documents reference a land of murky water and smells of dirt. It could be in the **${biomeDirection[0]}** or the **${biomeDirection[1]}**.`;
            case 'VOID':
                return `Some of the documents reference an area permeated by darkness and dread that could be nearby, Could that be **${biomeDirection[0]}**? or maybe **${biomeDirection[1]}**?`;
            default:
                throw new Error(
                    `This key ${randomBiome.biome_key} does not exist`,
                );
        }
    }

    async nearbyTreasure(boatId, playerId) {
        try {
            const boatStmt = db()
                .prepare('SELECT x_coord, y_coord FROM boat WHERE id = ?')
                .get(boatId);

            const xRange = this.range(10, boatStmt.x_coord - 5);
            const yRange = this.range(10, boatStmt.y_coord - 5);

            const treasureSurroundingStmt = db()
                .prepare(
                    `SELECT * FROM treasure 
                          WHERE boat_id = ? AND x_coord = ? 
                          AND y_coord IN ${sqlPlaceholder(yRange.length)} 
                          OR y_coord = ? 
                          AND x_coord IN ${sqlPlaceholder(xRange.length)}`,
                )
                .all(
                    boatId,
                    boatStmt.x_coord,
                    yRange,
                    boatStmt.y_coord,
                    xRange,
                );

            if (treasureSurroundingStmt.length > 0) {
                const treasure = treasureSurroundingStmt[0];
                if (
                    treasure.x_coord === boatStmt.x_coord &&
                    treasure.y_coord === boatStmt.y_coord
                ) {
                    return 'The documents seem to indicate there is treasure right below us...';
                }
                const direction = this.directionFinder(
                    { x: boatStmt.x_coord, y: boatStmt.y_coord },
                    { x: treasure.x_coord, y: treasure.y_coord },
                );

                return `Some of these documents make reference to treasure in a ${direction}ward direction`;
            }

            // Choose a random treasure
            // Randomly choose a direction cardinal to the boat direction

            const skillXP = await SkillService.getSkillXP(
                playerId,
                'CARTOGRAPHY',
            );
            const skillLevel = await SkillService.getCurrentLevel(skillXP);

            const effectModifier = await EffectService.getRarityEffectModifier(
                boatId,
                'TREASURE',
            );
            const treasure = await ItemService.randomItemByLootTag(
                'TREASURE',
                skillLevel,
                effectModifier,
            );

            const direction = Math.floor(Math.random() * 4);
            const position = { x: boatStmt.x_coord, y: boatStmt.y_coord };

            let directionName;

            switch (direction) {
                case 0:
                    // North
                    position.y += 1;
                    directionName = 'North';
                    break;
                case 1:
                    // East
                    position.x += 1;
                    directionName = 'East';
                    break;
                case 2:
                    // South
                    position.y -= 1;
                    directionName = 'South';
                    break;
                case 3:
                    // West
                    position.x -= 1;
                    directionName = 'West';
                    break;
                default:
                    throw new Error('Invalid direction');
            }

            db()
                .prepare(
                    'INSERT INTO treasure(boat_id, item_key, x_coord, y_coord) VALUES(?, ?, ?, ?)',
                )
                .run(boatId, treasure.item_key, position.x, position.y);

            return `Some of these documents make reference to treasure in a ${directionName}ward direction`;
        } catch (e) {
            console.error(e);
        }
    }

    range(size, startAt = 0) {
        return [...Array(size).keys()].map((i) => i + startAt);
    }

    directionFinder(originalPos, comparePos) {
        if (originalPos.x === comparePos.x) {
            if (originalPos.y < comparePos.y) return 'South';
            else return 'North';
        } else if (originalPos.x > comparePos.x) {
            return 'West';
        } else {
            return 'East';
        }
    }
}

export default new MapService();
