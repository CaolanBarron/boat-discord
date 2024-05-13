import ActivityService from "../ActivityService.js";
import SkillService from "../SkillService.js";
import db from "../../../database/database.js";
import BotService from "../BotService.js";
import { EmbedBuilder } from "discord.js";

class ResearchService {
  async start(guildId, player) {
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

    const stmt = db.prepare(
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
      const stmt = db.prepare(
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
