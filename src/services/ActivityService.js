import db from "../../database/database.js";
import schedule from "node-schedule";
import FishService from "./Commands/FishService.js";
import RepairService from "./Commands/RepairService.js";
import CartographyService from "./Commands/CartographyService.js";
import ResearchService from "./Commands/ResearchService.js";
import SailService from "./Commands/SailService.js";

class ActivityService {
  activityKeys = [
    "FISH",
    "CARTOGRAPHY",
    "REPAIR",
    "RESEARCH",
    "NORTH_SAILING",
    "SOUTH_SAILING",
    "WEST_SAILING",
    "EAST_SAILING",
  ];
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
          time: 600_000,
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
        NORTH_SAILING: {
          execute: SailService.announceEnd,
          time: 100_000,
          class: SailService,
        },
        SOUTH_SAILING: {
          execute: SailService.announceEnd,
          time: 100_000,
          class: SailService,
        },
        WEST_SAILING: {
          execute: SailService.announceEnd,
          time: 100_000,
          class: SailService,
        },
        EAST_SAILING: {
          execute: SailService.announceEnd,
          time: 100_000,
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
      const sql = db().prepare(
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
              : "You are currently too engrossed in studying geographical documents to do anything else...";
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
        case "NORTH_SAILING":
        case "SOUTH_SAILING":
        case "WEST_SAILING":
        case "EAST_SAILING":
          result = [
            "NORTH_SAILING",
            "SOUTH_SAILING",
            "WEST_SAILING",
            "EAST_SAILING",
          ].includes(requestedActivity)
            ? "You are already sailing The Boat!"
            : "You will have to stop sailing you want to do anything else...";
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
          case "NORTH_SAILING":
            result = `The bow splits the sea... you are currently sailing Northward!`;
            break;
          case "EAST_SAILING":
            result = `The bow splits the sea... you are currently sailing Eastward!`;
            break;
          case "WEST_SAILING":
            result = `The bow splits the sea... you are currently sailing Westward!`;
            break;
          case "SOUTH_SAILING":
            result = `The bow splits the sea... you are currently sailing Southward!`;
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
    const activityStmt = db()
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
          return `You look around for the toolbox but... ${activityStmt.name} is  fixing up the boat already.`;
        case "RESEARCH":
          return `You attempt to find some room at the research table but... ${activityStmt.name} is using the entire space.`;
        case "CARTOGRAPHY":
          return `You plan to sit down and pore over the maps to ease your boredom... Unfortunately ${activityStmt.name} would get in the way of that.`;
        default:
          throw new Error("This key doesn't exist: " + activity);
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
        case "NORTH_SAILING":
        case "SOUTH_SAILING":
        case "WEST_SAILING":
        case "EAST_SAILING":
          return `${playerName} gives up on their efforts to sail the boat... perhaps it should stay where it is...`;
        default:
          throw new Error(`This activity key ${key} does not exist`);
      }
    } catch (error) {
      throw error;
    }
  }
}

export default new ActivityService();
