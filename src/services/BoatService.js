import { stripIndent } from 'common-tags';
import db from '../../database/database.js';
import GameEventService from './GameEventService.js';

class BoatService {
    create(guildID, condition = 10, speed = 5, x_coord = 0, y_coord = 0) {
        try {
            if (!guildID) throw Error('No Guild ID????');
            const createStmt = db().prepare(
                'INSERT INTO boat(id, condition, speed, x_coord, y_coord) VALUES(?, ?, ?, ?, ?)',
            );

            createStmt.run(guildID, condition, speed, x_coord, y_coord);

            const defaultItems = [
                'GAS_TROUT',
                'GAS_TROUT',
                'GAS_TROUT',
                'SPYGLASS',
                'BOTTLE_NOTE',
                'WRENCH',
                'WRENCH',
                'WRENCH',
            ];

            const defaultItemStmt = db().prepare(
                'INSERT INTO boat_inventory(boat_id, item_key) VALUES (@boat_id, @item_key)',
            );

            const insertValues = defaultItems.map((item) => ({
                boat_id: guildID,
                item_key: item,
            }));

            for (const value of insertValues) {
                defaultItemStmt.run(value);
            }

            // Start up the sailing interval for all boats who are sailing

            GameEventService.startFlavorIntervals([guildID]);
            GameEventService.startPromptIntervals([guildID]);
            GameEventService.startTreasureShufflesIntervals([guildID]);
        } catch (error) {
            console.error(error);
        }
    }

    delete(guildID) {
        const boatDeleteStmt = db().prepare('DELETE FROM boat WHERE id = ?');
        boatDeleteStmt.run(guildID);
    }

    introductionNarrativeMessage() {
        return stripIndent`
        The world as you once knew it is gone, all that is left now is the open and endless ocean. 
        How did this happen? Unclear. 
        How did you end up on this boat? Nothing in your recollection.
        Who are these people around you? You get the picture.
        Physics don't work as good here and some nights when you are quiet you can hear whispers on the waves.
        Stay the course and keep sailing, keep surviving, maybe theres a way back to the world you left. 
    `;
    }

    introductionGameplayMessage() {
        return stripIndent`
      # Welcome to The Boat!
      Here's a quick rundown of how the game works:
      **Channels:**
        - All gameplay will happen in the \`deck\` channel. It is HIGHLY recommended everyone in the server mutes this channel as when playing there may be a lot of messages sent.
        - The foghorn channel should only be used by the bot. It will be used to notify players of things happening in the game or of events.
      **Activities:**
        - Most of this game is played through activities! These are accessed via discords slash commands.
        - An activity is an action you want your character to do.
        - A character will take real world time to complete an activity. Most activities will reward the player with an item or level up the players skills.
        - Most activities are limited to 1 player and the player to 1 activity, with some exceptions.
        - Use the command \`/help activities\` for more info!
      **Events:**
        - Every now and then something will happen in the game and the players will have to respond to it.
        - These are limited time events and will fail or pass if the players do not react.
        - Failing an event may negatively impact the activity it is connected to (E.g. sailing)
          `;
    }

    sail(guildId, direction) {
        const boat = db()
            .prepare('SELECT * FROM boat WHERE id = ?')
            .get(guildId);
        let new_x = boat.x_coord;
        let new_y = boat.y_coord;

        switch (direction) {
            case 'NORTH_SAILING':
                new_y = new_y + 1;
                break;
            case 'SOUTH_SAILING':
                new_y = new_y - 1;
                break;
            case 'WEST_SAILING':
                new_x = new_x - 1;
                break;
            case 'EAST_SAILING':
                new_x = new_x + 1;
                break;
        }

        db()
            .prepare('UPDATE boat SET x_coord = ?, y_coord = ? WHERE id = ?')
            .run(new_x, new_y, guildId);

        const currentBiome = this.currentBiome(guildId);

        const biome_key = currentBiome ? currentBiome.biome_key : null;

        db()
            .prepare(
                'INSERT INTO boat_travel_history(boat_id, x_coord, y_coord, biome) VALUES(?, ?, ?, ?)',
            )
            .run(guildId, new_x, new_y, biome_key);
    }

    currentBiome(guildId) {
        const boatStmt = db()
            .prepare('SELECT * FROM boat WHERE id = ?')
            .get(guildId);

        const biomeStmt = db()
            .prepare(
                'SELECT * FROM biome_coords WHERE x_coord = ? AND y_coord = ?',
            )
            .get(boatStmt.x_coord, boatStmt.y_coord);

        return biomeStmt;
    }
}
export default new BoatService();
