import { stripIndent } from 'common-tags';
import db from '../../../database/database.js';

class SalvageService {
    async salvage(guildId, player) {
        try {
            // Check if treasure exists on the current
            const boat = db()
                .prepare('SELECT * FROM boat WHERE id = ?')
                .get(guildId);
            const treasureExists = db()
                .prepare(
                    `SELECT * 
          FROM treasure 
          WHERE boat_id = ? AND x_coord = ? AND y_coord = ?`,
                )
                .get(boat.id, boat.x_coord, boat.y_coord);

            if (!treasureExists) {
                return {
                    content: stripIndent`The salvage lowers. The rope singes and twists.\nEventually it resurfaces, carying nothing.`,
                    ephemeral: false,
                };
            }

            // RENAME
            // Check if the boat_inventory has any WINCH

            const hasWinch = db()
                .prepare(
                    `SELECT * 
          FROM boat_inventory 
          WHERE boat_id = ? AND item_key = ?`,
                )
                .all(boat.id, 'WINCH');

            if (hasWinch.length === 0) {
                return {
                    content:
                        'The Boat does not have enough Winch to operate the salvage arm',
                    ephemeral: false,
                };
            }

            // remove the winch from the inventory
            db()
                .prepare('DELETE FROM boat_inventory WHERE id = ?')
                .run(hasWinch[0].id);
            // Remove the treasure from the world
            db()
                .prepare('DELETE FROM treasure where id = ?')
                .run(treasureExists.id);
            // Add the item to the inventory
            db()
                .prepare(
                    'INSERT INTO boat_inventory(boat_id,item_key,collected_by) VALUES(?,?,?)',
                )
                .run(boat.id, treasureExists.item_key, player.id);

            const item = db()
                .prepare('SELECT * FROM item WHERE key = ?')
                .get(treasureExists.item_key);

            return {
                content: stripIndent`The salvage arm lowers, the rope singes and twists.\nEventually the salvage arm resurfaces, in its clutches: A ${item.name}.`,
                ephemeral: false,
            };
        } catch (e) {
            console.error(e);
        }
    }
}

export default new SalvageService();
