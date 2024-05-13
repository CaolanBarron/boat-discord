import BotService from "./BotService.js";
import db from "../../database/database.js";
import schedule from "node-schedule";
import SkillService from "./SkillService.js";
import FishService from "./Commands/FishService.js";
import RepairService from "./Commands/RepairService.js";
import CartographyService from "./Commands/CartographyService.js";
import ResearchService from "./Commands/ResearchService.js";
import SailService from "./Commands/SailService.js";

class ActivityService {
  activityKeys = ["FISH", "CARTOGRAPHY", "REPAIR", "RESEARCH", "SAILING"];
  scheduleActivity(key, interaction) {
    try {
      const activities = {
        // TODO: Set the correct time for fishing
        FISH: {
          execute: FishService.announceEnd,
          time: 600_000,
          class: FishService,
        },
        // TODO: Set the correct time for mapping
        CARTOGRAPHY: {
          execute: CartographyService.announceEnd,
          time: 10_000,
          class: CartographyService,
        },
        // TODO: Set the correct time for repairing
        REPAIR: {
          execute: RepairService.announceEnd,
          time: 600_000,
          class: RepairService,
        },
        // TODO: Set the correct time for researching
        RESEARCH: {
          execute: ResearchService.announceEnd,
          time: 10000,
          class: ResearchService,
        },
        // TODO: Set the correct time for sailing
        SAILING: {
          execute: SailService.announceEnd,
          time: 10000,
          class: SailService,
        },
      };

      const activity = activities[key];
      if (!activity) {
        throw new Error(`Invalid activity: ${key}`);
      }

      const startTime = Date.now() + activity.time;
      schedule.scheduleJob(
        `${interaction.player.id}_${key}`,
        startTime,
        activity.execute.bind(activity.class, interaction)
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
              : "You will have to put away your tools if you want to do something else...";
          break;
        case "RESEARCH":
          result = "Poring over notes and samples...";
          ``;
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
      let result = "You are not doing anything at the moment.";
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
            result = `The bow splits the sea... you are currently sailing }`;
            break;
        }
      }
      return result;
    } catch (error) {
      console.error(error);
    }
  }
  async checkOccupied(activity, guildId) {
    // Checks the current active tags under the activity
    // if one exists return the correct response

    // TODO: by key
    const activityStmt = db
      .prepare(
        `SELECT *
        FROM active_tags at
        JOIN player p
        ON at.player_relation = p.id
        JOIN boat b
        ON p.boat_id = b.id
        WHERE b.id = ? AND at.key = ?;`
      )
      .get(guildId, activity);

    if (activityStmt) {
      switch (activity) {
        case "FISH":
          return `You look for the fishing rod but... ${activityStmt.name} is already fishing.`;
        case "REPAIR":
          return `You attempt to find some room at the research table but... ${activityStmt.name} is using the entire space.`;
        default:
          throw new Error("This key doesn't exist");
      }
    }
  }

  stopPhrase(key, playerName) {
    try {
      switch (key) {
        case "FISH":
          return `${playerName} packs away the fishing rod and contains their bait.`;
        case "CARTOGRAPHY":
          return `${playerName} puts away their papers and instruments. Perhaps they will try again later...`;
        case "REPAIR":
          return `${playerName} puts away their tools and washes the unpleasant oil off their hands.`;
        case "RESEARCH":
          return `${playerName} cleans their beakers as best they can and gives their brain some rest.`;
        case "SAILING":
          return `${playerName} unhands the helm and turns their eyes from the horizon.`;
        default:
          throw new Error(`This activity key ${key} does not exist`);
      }
    } catch (error) {
      throw error;
    }
  }
}

export default new ActivityService();
