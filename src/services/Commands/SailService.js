import ActivityService from "../ActivityService.js";
import SkillService from "../SkillService.js";
import db from "../../../database/database.js";
import BotService from "../BotService.js";
import { EmbedBuilder } from "discord.js";

class SailService {
  keys = {
    NORTH: "NORTH_SAILING",
    SOUTH: "SOUTH_SAILING",
    WEST: "WEST_SAILING",
    EAST: "EAST_SAILING",
  };
  async start(guildId, player, direction) {
    // Check if the boat is already sailing if no direction is given
    if (!direction) {
      const notSailing = await this.validateIsSailing(guildId);
      if (notSailing) {
        return {
          content: notSailing,
          ephemeral: true,
        };
      }
    }

    // TODO: Ensure the order of these checks do not cause problems

    // Check if the player is already busy doing something
    const isBusy = ActivityService.checkActive(player.id, this.keys[direction]);
    if (isBusy) {
      return {
        content: isBusy,
        ephemeral: true,
      };
    }

    // Check if any other players in the boat are doing incompatible activities
    const otherPlayersBusy = await this.checkOtherPlayers(guildId);

    if (otherPlayersBusy) {
      return {
        content: otherPlayersBusy,
        ephemeral: true,
      };
    }

    let tag;
    const currentDirection = db()
      .prepare(
        `SELECT key FROM
        active_tags 
        JOIN player 
        ON player.id = active_tags.player_relation 
        WHERE player.boat_id = ? AND key IN (${Object.keys(this.keys)
          .map(() => "?")
          .join(",")})`
      )
      .get(
        guildId,
        "NORTH_SAILING",
        "SOUTH_SAILING",
        "WEST_SAILING",
        "EAST_SAILING"
      );
    // No direction = Join the sailing with other players
    if (!direction) {
      tag = currentDirection.key;
    } else {
      if (currentDirection) {
        tag = currentDirection.key;
      } else {
        tag = this.keys[direction];
      }
    }

    // direction = Start sailing with the given direction

    // TODO: this sucks but il find a better way to do it later. Probably using all the check im already doing
    //Only create a job if you are the first sailor
    let firstTime = false;
    if (!currentDirection) {
      ActivityService.scheduleActivity(tag, { guildId, player });
      firstTime = true;
    }

    const stmt = db().prepare(
      "INSERT INTO active_tags(key, player_relation, boat) VALUES(?, ?, true)"
    );
    stmt.run(tag, player.id);

    let response;
    if (firstTime) {
      const prettyDirections = {
        NORTH_SAILING: "Northward",
        SOUTH_SAILING: "Southward",
        WEST_SAILING: "Westward",
        EAST_SAILING: "Eastward",
      };

      response = `Engines roar to life and the bow splits the waves, ${player.name} starts to sail The Boat ${prettyDirections[tag]}`;
    } else {
      response = `${player.name} joins the others in sailing the ship! Surely things will sail smoother now.`;
    }

    return {
      content: response,
      ephemeral: false,
    };
  }

  async endJob(guildId, player) {
    try {
      const stmt = db().prepare(
        `DELETE FROM active_tags 
        WHERE EXISTS(
          SELECT 1 
          FROM player
          WHERE player.boat_id = ? AND player.id = active_tags.player_relation) 
          AND key IN (${Object.keys(this.keys)
            .map(() => "?")
            .join(",")})`
      );
      stmt.run(
        guildId,
        "NORTH_SAILING",
        "SOUTH_SAILING",
        "EAST_SAILING",
        "WEST_SAILING"
      );

      SkillService.increaseXP(player.id, "SAIL");

      // TODO: Gameplay
      return "Sailed";
    } catch (error) {
      console.error(error);
    }
  }

  async announceEnd(interaction) {
    const results = await this.endJob(interaction.guildId, interaction.player);

    const bot = new BotService();
    const foghorn = bot.getChannelByName(
      interaction.guildId,
      process.env.NOTICHANNEL
    );

    const sailingEmbed = new EmbedBuilder()
      .setColor(0x0077be)
      .setTitle(`${interaction.player.name} sailing!`)
      .setDescription("Sailing")
      .addFields({ name: "Experience:", value: "++Sailing" });

    foghorn.send({ embeds: [sailingEmbed] });
  }

  async validateIsSailing(guildId) {
    const stmt = db()
      .prepare(
        `SELECT * FROM active_tags 
        JOIN player 
        ON active_tags.player_relation = player.id 
        WHERE player.boat_id = ? AND 
        active_tags.key IN (${Object.keys(this.keys)
          .map(() => "?")
          .join(",")})`
      )
      .all(
        guildId,
        "NORTH_SAILING",
        "SOUTH_SAILING",
        "WEST_SAILING",
        "EAST_SAILING"
      );

    if (stmt.length === 0) {
      return `The Boat is not sailing at the moment, try again with a direction.`;
    }
  }

  async checkOtherPlayers(guildId) {
    const stmt = db()
      .prepare(
        `SELECT * 
      FROM active_tags at 
      JOIN player p ON at.player_relation = p.id 
      WHERE p.boat_id = ? 
      AND at.key in (SELECT key FROM activities WHERE allow_during_sail = false)`
      )
      .all(guildId);

    if (stmt.length === 0) return;

    const outputs = stmt
      .map((act) => {
        switch (act.key) {
          case "FISH":
            return `\n- ${act.name} is currently fishing`;
          case "CARTOGRAPHY":
            return `\n- ${act.name} is currently studying the maps`;
          case "REPAIR":
            return `\n- ${act.name} is currently tinkering with the engine`;
          case "RESEARCH":
            return `\n- ${act.name} is currently at the research table`;
          default:
            throw new Error(`This key does not exist ${act.key}`);
        }
      })
      .join(",");

    return `You would like to sail the boat... However: ${outputs}. \nTry again when the boat is less busy! `;
  }
}

export default new SailService();
