import db from "../../database/database.js";
import chooseRandomRarity from "./utils.js";

class ItemService {
  // This is a table to determine the random chance of getting an item
  rarities = {
    COMMON: 60,
    RARE: 20,
    UNUSUAL: 15,
    ODDITY: 5,
  };

  async randomItemByLootTag(lootKey) {
    let lootTable;
    while (!lootTable || lootTable.length === 0) {
      const rarity = await chooseRandomRarity(this.rarities);
      lootTable = db()
        .prepare(
          "SELECT * FROM loot JOIN item ON item.key = loot.item_key WHERE loot.key = ? AND loot.rarity = ?"
        )
        .all(lootKey, rarity);
    }

    return lootTable[Math.floor(Math.random() * lootTable.length)];
  }

  async addToInventory(guidId, itemKey, playerId) {
    const inventoryStmt = db().prepare(
      "INSERT INTO boat_inventory(boat_id, item_key, collected_by) VALUES(?, ?, ?)"
    );
    inventoryStmt.run(guidId, itemKey, Math.floor(playerId));
  }
}

export default new ItemService();
