import db from '../../database/database.js';
import BoatService from './BoatService.js';
import chooseRandomRarity from './utils.js';

class MapService {
    rarities = {
        BIOME: 60,
        LAND: 20,
        TREASURE: 15,
        NOTHING: 5,
    };

    async randomDiscovery(guildId) {
        const choice = await chooseRandomRarity(this.rarities);
        switch (choice) {
            case 'BIOME':
                return await this.nearbyBiome(guildId);
            case 'LAND':
                return `TODO land creation`;
            case 'TREASURE':
                return `TODO treasure creation`;
            case 'NOTHING':
                return `Unfortunately this time they could not divine anything from the blasted documents.`;
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
          WHERE x_coord = ? AND y_coord IN (${yRange
              .map(() => '?')
              .join(',')}) OR y_coord = ? AND x_coord IN (${xRange
                    .map(() => '?')
                    .join(',')})`
            )
            .all(boatStmt.x_coord, yRange, boatStmt.y_coord, xRange);

        if (biomeSurroundingStmt.length === 0) {
            return `Unfortunately this time they could not divine anything from the blasted documents.`;
        }
        const randomBiome =
            biomeSurroundingStmt[
                Math.floor(Math.random() * biomeSurroundingStmt.length)
            ];

        const currentBiome = BoatService.currentBiome(guildId);
        if (currentBiome && currentBiome.biome_key === randomBiome.biome_key) {
            return `Unfortunately this time they could not divine anything from the blasted documents.`;
        }

        let directions = ['North', 'South', 'West', 'East'];
        let biomeDirection = [];
        // Find out what direction the biome is in.
        if (boatStmt.x_coord === randomBiome.x_coord) {
            if (boatStmt.y_coord < randomBiome.y) {
                directions = directions.filter((i) => i !== 'South');
                biomeDirection.push('South');
            } else {
                directions = directions.filter((i) => i !== 'North');
                biomeDirection.push('North');
            }
        } else {
            if (boatStmt.x_coord > randomBiome.x_coord) {
                directions = directions.filter((i) => i !== 'West');
                biomeDirection.push('West');
            } else {
                directions = directions.filter((i) => i !== 'East');
                biomeDirection.push('East');
            }
        }
        // Choose a random direction other than the chosen one
        biomeDirection.push(
            directions[Math.floor(Math.random() * directions.length)]
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
                    `This key ${randomBiome.biome_key} does not exist`
                );
        }
    }

    range(size, startAt = 0) {
        return [...Array(size).keys()].map((i) => i + startAt);
    }
}

export default new MapService();
