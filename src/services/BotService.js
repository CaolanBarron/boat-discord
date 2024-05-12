import ActivityService from "./ActivityService.js";
import db from "../../database/database.js";

class BotService {
  getChannelByName(guildId, name) {
    return global.client.channels.cache.find(
      (channel) => channel.name === name && channel.guildId === guildId
    );
  }

  restartActivities() {
    const activityKeys = [
      "FISH",
      "CARTOGRAPHY",
      "REPAIR",
      "RESEARCH",
      "SAILING",
    ];
    const sql = `SELECT * FROM active_tags at JOIN player p ON at.player_relation = p.id WHERE at.key IN (${activityKeys
      .map(() => "?")
      .join(",")})`;
    const activities = db.prepare(sql).all(activityKeys);

    for (const activity of activities) {
      ActivityService.scheduleActivity(activity.key, {
        guildId: activity.boat_id,
        player: { id: activity.id, name: activity.name },
      });
    }
  }
}

export default BotService;
