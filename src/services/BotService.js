import ActivityService from "./ActivityService.js";
import db from "../../database/database.js";

class BotService {
  async getChannelByName(guildId, name) {
    return global.client.channels.cache.find(
      (channel) => channel.name === name && channel.guildId === guildId
    );
  }

  async restartActivities() {
    const activityKeys = [
      "FISH",
      "CARTOGRAPHY",
      "REPAIR",
      "RESEARCH",
      "NORTH_SAILING",
      "SOUTH_SAILING",
      "WEST_SAILING",
      "EAST_EAST",
    ];
    const sql = `SELECT * FROM active_tags at JOIN player p ON at.player_relation = p.id WHERE at.key IN (${activityKeys
      .map(() => "?")
      .join(",")})`;
    let activities = db().prepare(sql).all(activityKeys);

    let perBoatSailing = [];
    activities = activities.map((act) => {
      if (
        ![
          "NORTH_SAILING",
          "SOUTH_SAILING",
          "WEST_SAILING",
          "EAST_EAST",
        ].includes(act.key)
      )
        return act;
      if (!perBoatSailing.includes(act.boat)) {
        perBoatSailing.push(act.boat);
        return act;
      } else {
        return [];
      }
    });

    activities = activities.flat();

    for (const activity of activities) {
      ActivityService.scheduleActivity(activity.key, {
        guildId: activity.boat_id,
        player: { id: activity.id, name: activity.name },
      });
    }
  }
}

export default new BotService();
