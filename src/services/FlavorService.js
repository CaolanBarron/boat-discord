import db from '../../database/database.js';
import BoatService from './BoatService.js';

class FlavourService {
    getPlayerFlavor(content, player) {
        try {
            // allows the format function of strings to insert values into the flavor
            // strings stored in the database
            String.prototype.format = function () {
                const args = arguments;
                return this.replace(/{([0-9]+)}/g, function (match, index) {
                    return typeof args[index] == 'undefined'
                        ? match
                        : args[index];
                });
            };

            const stmt = db()
                .prepare(
                    `SELECT * FROM flavor 
                    WHERE subject = ?
                    AND tag IS NULL 
                    OR tag IN (
                      SELECT key 
                      FROM active_tags 
                      WHERE player_id = ?)`,
                )
                .all('PLAYER', player.id);

            const tagOnlyFlavors = stmt.filter((f) => f.tag !== null);

            let flavorMessage;
            if (tagOnlyFlavors.length > 0) {
                flavorMessage = tagOnlyFlavors[
                    Math.floor(Math.random() * tagOnlyFlavors.length)
                ].content.format(content, player.name);
            } else {
                flavorMessage = stmt[
                    Math.floor(Math.random() * stmt.length)
                ].content.format(content, player.name);
            }

            return flavorMessage;
        } catch (error) {
            console.error(error);
        }
    }

    getBoatFlavor(guildId) {
        try {
            const currentBiome = BoatService.currentBiome(guildId);
            const biome_key = currentBiome ? currentBiome.biome_key : null;

            const stmt = db()
                .prepare(
                    'SELECT * FROM flavor WHERE subject = ? AND tag IS null OR tag = ?',
                )
                .all('BOAT', biome_key);

            return stmt[Math.floor(Math.random() * stmt.length)];
        } catch (error) {
            console.error(error);
        }
    }
}

export default new FlavourService();
