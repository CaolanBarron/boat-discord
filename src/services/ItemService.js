import { EmbedBuilder } from '@discordjs/builders';
import db from '../../database/database.js';
import { chooseRandomRarity } from './utils.js';

class ItemService {
    // This is a table to determine the random chance of getting an item
    rarities = {
        COMMON: 60,
        RARE: 20,
        UNUSUAL: 15,
        ODDITY: 5,
    };

    async randomItemByLootTag(lootKey, skillModifier, effectModifier) {
        let lootTable;
        while (!lootTable || lootTable.length === 0) {
            const rarity = await chooseRandomRarity(
                this.rarities,
                skillModifier,
                effectModifier
            );

            lootTable = db()
                .prepare(
                    'SELECT * FROM loot JOIN item ON item.key = loot.item_key WHERE loot.key = ? AND loot.rarity = ?'
                )
                .all(lootKey, rarity);
        }

        return lootTable[Math.floor(Math.random() * lootTable.length)];
    }

    async addToInventory(guidId, itemKey, playerId) {
        const inventoryStmt = db().prepare(
            'INSERT INTO boat_inventory(boat_id, item_key, collected_by) VALUES(?, ?, ?)'
        );
        inventoryStmt.run(guidId, itemKey, Math.floor(playerId));
    }

    async displayInventory(guildId) {
        try {
            const inventoryStmt = db()
                .prepare(
                    'SELECT * FROM boat_inventory JOIN item ON boat_inventory.item_key = item.key WHERE boat_id = ?'
                )
                .all(guildId);
            let displayable;
            if (inventoryStmt.length === 0) {
                displayable = 'The Boats inventory is currently empty.';
            } else {
                displayable = inventoryStmt
                    .map((item) => {
                        const result = `${item.id}\t|\t${item.name}`;
                        if (item.locked_by) return result.concat(':lock:');
                        return result;
                    })
                    .join('\n');
            }
            const inventoryEmbed = new EmbedBuilder()
                .setColor(0x0077be)
                .setTitle('Inventory')
                .setDescription(displayable);

            return inventoryEmbed;
        } catch (error) {
            console.error(error);
        }
    }

    async itemInfo(itemKey) {
        try {
            const response = db()
                .prepare('SELECT * FROM item WHERE key = ?')
                .get(itemKey);
            return response.info;
        } catch (error) {
            console.error(error);
        }
    }
}

export default new ItemService();
