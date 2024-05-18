import ActivityService from "../ActivityService.js";
import SkillService from "../SkillService.js";
import db from "../../../database/database.js";
import BotService from "../BotService.js";
import { EmbedBuilder } from "discord.js";

class CartographyService {
  async start(guildId, player) {
    const isBusy = ActivityService.checkActive(player.id, "CARTOGRAPHY");
    if (isBusy) {
      return {
        content: isBusy,
        ephemeral: true,
      };
    }

    const isOccupied = await ActivityService.checkOccupied(
      "CARTOGRAPHY",
      guildId
    );
    if (isOccupied) {
      return {
        content: isOccupied,
        ephemeral: true,
      };
    }

    const stmt = db().prepare(
      "INSERT INTO active_tags(key, player_relation) VALUES(?, ?)"
    );
    stmt.run("CARTOGRAPHY", player.id);

    ActivityService.scheduleActivity("CARTOGRAPHY", { guildId, player });

    // TODO: CARTOGRAPHY response
    return {
      content: `Mappings`,
      ephemeral: false,
    };
  }

  async endJob(guildId, player) {
    try {
      const stmt = db().prepare(
        "DELETE FROM active_tags WHERE player_relation = ? AND key = ?"
      );
      stmt.run(player.id, "CARTOGRAPHY");

      SkillService.increaseXP(player.id, "CARTOGRAPHY");

      // TODO: Gameplay
      return "Mapped";
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
      .setTitle(`${interaction.player.name} mapping!`)
      .setDescription("Mapping")
      .addFields({ name: "Experience:", value: "++Cartography" });

    foghorn.send({ embeds: [cartographyEmbed] });
  }
}

export default new CartographyService();
