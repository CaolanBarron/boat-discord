import BotService from "./BotService.js";
import db from "../../database/database.js";
import schedule from "node-schedule";
import SkillService from "./SkillService.js";
import FishService from "./Commands/FishService.js";

class ActivityService {
  activityKeys = ["FISH", "CARTOGRAPHY", "REPAIR", "RESEARCH", "SAILING"];
  scheduleActivity(key, interaction) {
    try {
      const activities = {
        // TODO: Set the correct time for fishing
        FISH: { execute: FishService.announceEnd, time: 600_000 },
        // TODO: Set the correct time for mapping
        CARTOGRAPHY: { execute: this.map, time: 10000 },
        // TODO: Set the correct time for repairing
        REPAIR: { execute: this.repair, time: 10000 },
        // TODO: Set the correct time for researching
        RESEARCH: { execute: this.research, time: 10000 },
        // TODO: Set the correct time for sailing
        SAILING: { execute: this.sailing, time: 10000 },
      };

      const activity = activities[key];
      if (!activity) {
        throw new Error(`Invalid activity: ${key}`);
      }

      const startTime = Date.now() + activity.time;
      schedule.scheduleJob(
        `${interaction.player.id}_${key}`,
        startTime,
        activity.execute.bind(null, interaction)
      );
    } catch (error) {
      console.error(error);
    }
  }

  getCurrent(playerId) {
    try {
      const sql = db.prepare(
        `SELECT * FROM active_tags  WHERE player_relation = ? AND key IN (${this.activityKeys
          .map(() => "?")
          .join(",")})`
      );

      const activity = sql.get(playerId, this.activityKeys);

      return activity;
    } catch (error) {
      console.error(error);
    }
  }
  //Checks if the player is doing an activity that would clash with player request
  checkActive(playerId, requestedActivity) {
    // Pass in the requested activity to check if player current matches
    const activeUser = this.getCurrent(playerId);

    let result;
    if (activeUser) {
      result = "You're busy!";
      switch (activeUser.key) {
        case "FISH":
          result =
            requestedActivity === "FISH"
              ? "You are already fishing!"
              : `You will have to put down your fishing rod if you want to do something else...`;
          break;
        case "CARTOGRAPHY":
          result =
            requestedActivity === "CARTOGRAPHY"
              ? "You are already studying the maps!"
              : "You will have to pack away your maps and instruments if you want to do something else...";
          break;
        case "REPAIR":
          result =
            requestedActivity === "REPAIR"
              ? "You are already tinkering with the engine!"
              : "";
          break;
        case "RESEARCH":
          result = "Poring over notes and samples...";
          break;
        case "SAILING":
          result = "Barreling through the waves...";
          break;
      }
    }
    return result;
  }

  // Returns the current activity of the player to display to them
  async checkCurrent(player) {
    const user = this.getCurrent(player.id);
    try {
      let result = "Yoyu are not doing anything at the moment.";
      if (user) {
        switch (user.key) {
          case "FISH":
            result = "Line cast... you are currently fishing!";
            break;
          case "CARTOGRAPHY":
            result = "Compass in hand.. you are currently mapping!";
            break;
          case "REPAIR":
            result = "Calloused hands... you are currently repairing!";
            break;
          case "RESEARCH":
            result =
              "Vials rattle with the waves... you are currently researching!";
            break;
          case "SAILING":
            // TODO: Account for direction
            result = `The bow splits the sea... you are currently sailing ${"asdasd"}`;
            break;
        }
      }
      return result;
    } catch (error) {
      console.error(error);
    }
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
