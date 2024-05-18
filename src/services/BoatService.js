import { stripIndent } from "common-tags";
import db from "../../database/database.js";

class BoatService {
  create(guildID, condition = 10, speed = 5, x_coord = 0, y_coord = 0) {
    try {
      if (!guildID) throw Error("No Guild ID????");
      const createStmt = db().prepare(
        "INSERT INTO boat(id, condition, speed, x_coord, y_coord) VALUES(?, ?, ?, ?, ?)"
      );

      createStmt.run(guildID, condition, speed, x_coord, y_coord);
    } catch (error) {
      console.error(error);
    }
  }

  delete(guildID) {
    const boatDeleteStmt = db().prepare("DELETE FROM boat WHERE id = ?");
    boatDeleteStmt.run(guildID);
  }

  introductionNarrativeMessage() {
    return stripIndent`
    PENDING
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

  sail() {}
}
export default new BoatService();
