import BotService from "./BotService.js";
import Database from "better-sqlite3";
const db = new Database(process.env.DATABASEURL);
import schedule from "node-schedule";
import SkillService from "./SkillService.js";
import { stripIndent } from "common-tags";
import ItemService from "./ItemService.js";
import { EmbedBuilder } from "discord.js";

class ActivityService {
  activityKeys = ["FISH", "CARTOGRAPHY", "REPAIR", "RESEARCH", "SAILING"];
  scheduleActivity(key, interaction) {
    try {
      const activities = {
        // TODO: Set the correct time for fishing
        FISH: { execute: this.fish, time: 600_000 },
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

  checkActive(player) {
    const activeUser = this.getCurrent(player);

    let result;
    if (activeUser) {
      result = "You're busy!";
      switch (activeUser.key) {
        case "FISH":
          result = `You will have to put down your fishing rod if you want to do something else...`;
          break;
        case "CARTOGRAPHY":
          result = "Mapping the unknown...";
          break;
        case "REPAIR":
          result = "Covered in engine grease...";
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

  getCurrent(player) {
    try {
      const sql = db.prepare(
        `SELECT * FROM active_tags  WHERE player_relation = ? AND key IN (${this.activityKeys
          .map(() => "?")
          .join(",")})`
      );

      const user = sql.get(player.id, this.activityKeys);

      return user;
    } catch (error) {
      console.error(error);
    }
  }

  async checkCurrent(player) {
    const user = this.getCurrent(player);
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

  /**
   * Data needed from interaction for the following functions:
   * - player
   * - guildId
   */
  async fish(interaction) {
    try {
      const stmt = db.prepare(
        "DELETE FROM active_tags WHERE player_relation = ? AND key = ?"
      );
      stmt.run(interaction.player.id, "FISH");

      SkillService.increaseXP(interaction.player.id, "FISH");

      const foghorn = BotService.getChannelByName(
        interaction.guildId,
        process.env.NOTICHANNEL
      );

      const catches = await ItemService.randomItemByLootTag("FISH");

      await ItemService.addToInventory(
        interaction.guildId,
        catches.key,
        interaction.player.id
      );

      const fishEmbed = new EmbedBuilder()
        .setColor(0x0077be)
        .setTitle(`${interaction.player.name} has finished Fishing!`)
        .setDescription("I wonder what they caught...")
        .addFields(
          { name: "Caught:", value: `${catches.name}\n${catches.description}` },
          { name: "Experience", value: "++Fishing" }
        );

      foghorn.send({ embeds: [fishEmbed] });
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
