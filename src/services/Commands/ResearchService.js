import ActivityService from "../ActivityService.js";
import SkillService from "../SkillService.js";
import db from "../../../database/database.js";
import BotService from "../BotService.js";
import { EmbedBuilder } from "discord.js";

class ResearchService {
  async start(guildId, player, itemId) {
    const isBusy = ActivityService.checkActive(player.id, "RESEARCH");
    if (isBusy) {
      return {
        content: isBusy,
        ephemeral: true,
      };
    }

    const isOccupied = await ActivityService.checkOccupied("RESEARCH", guildId);
    if (isOccupied) {
      return {
        content: isOccupied,
        ephemeral: true,
      };
    }

    // Check if  the itemId is incorrectly formatted

    if (itemId) {
      if (!Boolean(Number.parseInt(itemId))) {
        return {
          content: "The item ID is not in the correct format",
          ephemeral: true,
        };
      }

      const item = db()
        .prepare(
          "SELECT boat_inventory.*, player.name AS locker_name FROM boat_inventory LEFT JOIN player on boat_inventory.locked_by = player.id WHERE boat_inventory.id = ?"
        )
        .get(itemId);

      if (!item) {
        return {
          content:
            "This item does not exist. Make sure you are using the correct ID.",
          ephemeral: true,
        };
      }
      if (item.locked_by) {
        return {
          content: `This item is already in use by ${item.locker_name}.`,
          ephemeral: true,
        };
      }
    }

    const stmt = db().prepare(
      "INSERT INTO active_tags(key, player_relation) VALUES(?, ?)"
    );
    stmt.run("RESEARCH", player.id);

    ActivityService.scheduleActivity("RESEARCH", { guildId, player });

    // TODO: RESEARCH response
    return {
      content: `Research`,
      ephemeral: false,
    };
  }

  async endJob(guildId, player) {
    try {
      const stmt = db().prepare(
        "DELETE FROM active_tags WHERE player_relation = ? AND key = ?"
      );
      stmt.run(player.id, "RESEARCH");

      SkillService.increaseXP(player.id, "RESEARCH");

      // TODO: Gameplay
      return "Research";
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

    const cartographyEmbed = new EmbedBuilder()
      .setColor(0x0077be)
      .setTitle(`${interaction.player.name} researching!`)
      .setDescription("Research")
      .addFields({ name: "Experience:", value: "++Research" });

    foghorn.send({ embeds: [cartographyEmbed] });
  }
}
export default new ResearchService();
