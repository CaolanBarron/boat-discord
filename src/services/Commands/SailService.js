import ActivityService from "../ActivityService.js";
import SkillService from "../SkillService.js";
import db from "../../../database/database.js";
import BotService from "../BotService.js";
import { EmbedBuilder } from "discord.js";

class SailService {
  async start(guildId, player) {
    const isBusy = ActivityService.checkActive(player.id, "SAILING");
    if (isBusy) {
      return {
        content: isBusy,
        ephemeral: true,
      };
    }

    const isOccupied = await ActivityService.checkOccupied("SAILING", guildId);
    if (isOccupied) {
      return {
        content: isOccupied,
        ephemeral: true,
      };
    }

    const stmt = db.prepare(
      "INSERT INTO active_tags(key, player_relation) VALUES(?, ?)"
    );
    stmt.run("SAILING", player.id);

    ActivityService.scheduleActivity("SAILING", { guildId, player });

    // TODO: SAILING response
    return {
      content: `Sailing`,
      ephemeral: false,
    };
  }

  async endJob(guildId, player) {
    try {
      const stmt = db.prepare(
        "DELETE FROM active_tags WHERE player_relation = ? AND key = ?"
      );
      stmt.run(player.id, "SAILING");

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
}

export default new SailService();
