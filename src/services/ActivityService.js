import BotService from "./BotService.js";
import Database from "better-sqlite3";
const db = new Database(process.env.DATABASEURL);
import schedule from "node-schedule";
import SkillService from "./SkillService.js";

class ActivityService {
  scheduleActivity(key, interaction) {
    const activities = {
      FISH: { execute: this.fish, time: 10000 },
      CARTOGRAPHY: { execute: this.map, time: 10000 },
      REPAIR: { execute: this.repair, time: 10000 },
      RESEARCH: { execute: this.research, time: 10000 },
      SAILING: { execute: this.sailing, time: 10000 },
    };

    const activity = activities[key];
    if (!activity) {
      throw new Error(`Invalid activity: ${key}`);
    }

    const startTime = Date.now() + activity.time;
    schedule.scheduleJob(startTime, activity.execute.bind(null, interaction));
  }

  checkActive(playerId) {}

  /**
   * Data needed from interaction for the following functions:
   * - player
   * - guildId
   */
  fish(interaction) {
    const stmt = db.prepare(
      "DELETE FROM active_tags WHERE player_relation = ? AND key = ?"
    );
    stmt.run(interaction.player.id, "FISH");

    SkillService.increaseXP(interaction.player.id, "FISH");

    const foghorn = BotService.getChannelByName(
      interaction.guildId,
      process.env.NOTICHANNEL
    );

    foghorn.send(`${interaction.player.name} has finished fishing...`);
  }

  map(interaction) {
    const stmt = db.prepare(
      "DELETE FROM active_tags WHERE player_relation = ? AND key = ?"
    );
    stmt.run(interaction.player.id, "CARTOGRAPHY");

    SkillService.increaseXP(interaction.player.id, "CARTOGRAPHY");

    const foghorn = BotService.getChannelByName(
      interaction.guildId,
      process.env.NOTICHANNEL
    );
    foghorn.send(`${interaction.player.name} has finished mapping...`);
  }

  repair(interaction) {
    const stmt = db.prepare(
      "DELETE FROM active_tags WHERE player_relation = ? AND key = ?"
    );
    stmt.run(interaction.player.id, "REPAIR");

    SkillService.increaseXP(interaction.player.id, "REPAIR");

    const foghorn = BotService.getChannelByName(
      interaction.guildId,
      process.env.NOTICHANNEL
    );
    foghorn.send(`${interaction.player.name} has finished repairing...`);
  }

  research(interaction) {
    const stmt = db.prepare(
      "DELETE FROM active_tags WHERE player_relation = ? AND key = ?"
    );
    stmt.run(interaction.player.id, "RESEARCH");

    SkillService.increaseXP(interaction.player.id, "RESEARCH");

    const foghorn = BotService.getChannelByName(
      interaction.guildId,
      process.env.NOTICHANNEL
    );
    foghorn.send(`${interaction.player.name} has finished researching...`);
  }

  sailing(interaction) {
    const stmt = db.prepare(
      "DELETE FROM active_tags WHERE player_relation = ? AND key = ?"
    );
    stmt.run(interaction.player.id, "SAILING");

    SkillService.increaseXP(interaction.player.id, "SAIL");

    const foghorn = BotService.getChannelByName(
      interaction.guildId,
      process.env.NOTICHANNEL
    );
    foghorn.send(`${interaction.player.name} has finished sailing...`);
  }
}

export default new ActivityService();
