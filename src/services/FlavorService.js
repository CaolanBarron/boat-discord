import db from '../../database/database.js';
import BoatService from './BoatService.js';

class FlavourService {
    getPlayerFlavor(content, characterName) {
        try {
            String.prototype.format = function () {
                var args = arguments;
                return this.replace(/{([0-9]+)}/g, function (match, index) {
                    return typeof args[index] == 'undefined'
                        ? match
                        : args[index];
                });
            };

            const stmt = db()
                .prepare('SELECT * FROM flavor WHERE subject = ?')
                .all('PLAYER');

            const randomFlavor = Math.floor(Math.random() * stmt.length);

            return stmt[randomFlavor].content.format(content, characterName);
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
                    'SELECT * FROM flavor WHERE subject = ? AND tag IS null OR tag = ?'
                )
                .all('BOAT', biome_key);

            return stmt[Math.floor(Math.random() * stmt.length)];
        } catch (error) {
            console.error(error);
        }
    }
}

export default new FlavourService();
