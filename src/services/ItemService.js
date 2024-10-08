import { EmbedBuilder } from '@discordjs/builders';
import db from '../../database/database.js';
import { chooseRandomRarity } from './Utils.js';
import Item from '../items/item.js';

class ItemService {
    constructor() {
        // This is a table to determine the random chance of getting an item
        this.rarities = {
            COMMON: 60,
            RARE: 20,
            UNUSUAL: 15,
            ODDITY: 5,
        };
    }

    async randomItemByLootTag(lootKey, skillModifier, effectModifier) {
        let lootTable;
        let loopChecker = 0;
        while (!lootTable || lootTable.length === 0) {
            loopChecker++;
            if (loopChecker > 10) throw new Error('Potential Infinite loop');
            const rarity = chooseRandomRarity(
                this.rarities,
                skillModifier,
                effectModifier,
            );

            lootTable = db()
                .prepare(
                    'SELECT * FROM loot_item JOIN item ON item.key = loot_item.item_key JOIN loot ON loot_item.loot_id = loot.id WHERE loot.key = ? AND loot_item.rarity = ?',
                )
                .all(lootKey, rarity);
        }

        return lootTable[Math.floor(Math.random() * lootTable.length)];
    }

    async addToInventory(guidId, itemKey, playerId) {
        const inventoryStmt = db().prepare(
            'INSERT INTO boat_inventory(boat_id, item_key, collected_by) VALUES(?, ?, ?)',
        );
        inventoryStmt.run(guidId, itemKey, Math.floor(playerId));
    }

    async displayInventory(guildId) {
        try {
            const inventoryStmt = db()
                .prepare(
                    'SELECT * FROM boat_inventory JOIN item ON boat_inventory.item_key = item.key WHERE boat_id = ?',
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

    async useItem(player, itemId) {
        const itemData = db()
            .prepare(
                `SELECT * 
                  FROM boat_inventory bi 
                  JOIN item i ON bi.item_key = i.key 
                  WHERE id = ? AND boat_id = ?`,
            )
            .get(itemId, player.boat_id);

        if (!itemData) {
            return {
                content: 'This item is not in The Boats Inventory',
                ephemeral: true,
            };
        }

        const itemUses = db()
            .prepare('SELECT * FROM item_uses WHERE item_key = ?')
            .all(itemData.key);

        const item = new Item(itemData, itemUses);

        if (item.uses.length === 0) {
            if (item.useDescription) return item.useDescription;
            else return 'This item has no usability';
        }

        await item.use(player);
        if (!item.useDescription) {
            throw new Error('This item should have a use description');
        }
        return item.useDescription;
    }

    /*
     * Params:
     * boatId String
     * itemId String
     *
     * Returns:
     * result String
     */
    async inspectItem(boatId, itemId) {
        const item = db()
            .prepare(
                `SELECT * 
                  FROM boat_inventory bi 
                  JOIN item i ON bi.item_key = i.key 
                  WHERE id = ? AND boat_id = ?`,
            )
            .get(itemId, boatId);

        if (!item) {
            return {
                content: 'This item is not in The Boats Inventory',
                ephemeral: true,
            };
        }
        return { content: item.description, ephemeral: false };
    }

    async disposeItem(boatId, itemId) {
        const item = db()
            .prepare(
                `SELECT * 
                  FROM boat_inventory bi 
                  JOIN item i ON bi.item_key = i.key 
                  WHERE id = ? AND boat_id = ?`,
            )
            .get(itemId, boatId);

        if (item.special) {
            return {
                content: 'This item is special and cannot be disposed',
                ephemeral: true,
            };
        }

        if (!item) {
            return {
                content: 'This item is not in The Boats Inventory',
                ephemeral: true,
            };
        }
        db().prepare('DELETE FROM boat_inventory WHERE id = ?').run(itemId);

        return {
            content: `The ${item.name} has been disposed of.`,
            ephemeral: false,
        };
    }
}

export default new ItemService();
