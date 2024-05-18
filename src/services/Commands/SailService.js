import ActivityService from "../ActivityService.js";
import SkillService from "../SkillService.js";
import db from "../../../database/database.js";
import BotService from "../BotService.js";
import { EmbedBuilder } from "discord.js";

class SailService {
  keys = {
    NORTH: "SAILING_NORTH",
    SOUTH: "SAILING_SOUTH",
    WEST: "SAILING_WEST",
    EAST: "SAILING_EAST",
  };
  async start(guildId, player, direction) {
    // if no direction check for current if the boat is currently sailing
    if (!direction) {
      this.validateSailingStatus();
    }

    const isBusy = ActivityService.checkActive(player.id, this.keys[direction]);
    if (isBusy) {
      return {
        content: isBusy,
        ephemeral: true,
      };
    }

    // const isOccupied = await ActivityService.checkOccupied(
    //   this.keys[direction],
    //   guildId
    // );
    // if (isOccupied) {
    //   return {
    //     content: isOccupied,
    //     ephemeral: true,
    //   };
    // }

    const stmt = db().prepare(
      "INSERT INTO active_tags(key, player_relation, boat) VALUES(?, ?, true)"
    );
    stmt.run(this.keys[direction], player.id);

    ActivityService.scheduleActivity("SAILING", { guildId, player });

    // TODO: SAILING response
    return {
      content: `Sailing`,
      ephemeral: false,
    };
  }

  async endJob(guildId, player) {
    try {
      const stmt = db().prepare(
        `DELETE FROM active_tags WHERE player_relation = ? AND key IN (${Object.keys(
          this.keys
        )
          .map(() => "?")
          .join(",")})`
      );
      stmt.run(
        player.id,
        "SAILING_NORTH",
        "SAILING_SOUTH",
        "SAILING_EAST",
        "SAILING_WEST"
      );
      console.log(stmt);

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

  async validateSailingStatus(guildId) {
    const stmt = db()
      .prepare(
        `SELECT * FROM active_tags JOIN player ON active_tags.player_relation = player.id WHERE player.boat_id = ? AND active_tags.key LIKE (${Object.keys(
          this.keys
        )
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
    console.log(stmt);
  }
}

export default new SailService();
