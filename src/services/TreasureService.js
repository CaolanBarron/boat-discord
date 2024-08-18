import db from '../../database/database.js';

class TreasureService {
  constructor() {
    this.RANDOM_ITEMS = 5;
  }

  async shuffleTreasure(boatId) {
    if (this.RANDOM_ITEMS > 80) {
      throw new Error(
        'Random items count is too high this is very likely to cause issues with map size',
      );
    }
    // Remove all the treasure by boat
    await this.removeAllByBoat(boatId);
    // Get all the possible items for treasure
    const items = db()
      .prepare('SELECT * FROM loot_item WHERE loot_key = ?')
      .all('TREASURE');

    // Grab X random items
    const randomItems = new Array(this.RANDOM_ITEMS)
      .fill({})
      .map(() => items[Math.floor(Math.random() * items.length)]);

    // generate a unique set of coordinates for each item
    const treasures = [];

    const randomCoord = () => Math.floor(Math.random() * 20) - 10;
    const checkExistingCoords = (check, x, y) => {
      for (const i of check) {
        if (i.x_coord === x && i.y_coord === y) return true;
      }
      return false;
    };

    for (const item of randomItems) {
      let loopChecker = 0;
      while (true) {
        loopChecker++;
        if (loopChecker > 50) {
          throw new Error('Potential infinite loop');
        }
        const coords = { x: randomCoord(), y: randomCoord() };
        if (checkExistingCoords(treasures, coords.x, coords.y)) {
          continue;
        }
        treasures.push({
          boat_id: boatId,
          item_key: item.item_key,
          x_coord: coords.x,
          y_coord: coords.y,
        });
        break;
      }
    }
    // Add these to the treasure table

    const defaultTreasureStmt = db().prepare(
      'INSERT INTO treasure(boat_id, item_key, x_coord, y_coord) VALUES(@boat_id, @item_key, @x_coord, @y_coord)',
    );

    for (const treasure of treasures) {
      defaultTreasureStmt.run(treasure);
    }
  }

  async add(boatId, itemKey, coords) {
    db()
      .prepare('INSERT INTO treasure VALUES(?, ?, ?, ?)')
      .run(boatId, itemKey, coords.x, coords.y);
  }

  async removeByLocation(boatId, coords) {
    db()
      .prepare(
        'DELETE FROM treasure WHERE boat_id = ? AND x_coord = ? AND y_coord = ?',
      )
      .run(boatId, coords.x, coords.y);
  }

  async removeAllByBoat(boatId) {
    db().prepare('DELETE FROM treasure WHERE boat_id = ?').run(boatId);
  }
}

export default new TreasureService();
