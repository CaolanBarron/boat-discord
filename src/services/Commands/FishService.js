import db from "../../../database/database.js";
import ActivityService from "../../services/ActivityService.js";
import SkillService from "../SkillService.js";
import ItemService from "../ItemService.js";
import BotService from "../BotService.js";
import { EmbedBuilder } from "discord.js";

class FishService {
  async start(guildId, player) {
    const isBusy = ActivityService.checkActive(player.id, "FISH");
    if (isBusy) {
      return {
        content: isBusy,
        ephemeral: true,
      };
    }

    const isOccupied = await ActivityService.checkOccupied("FISH", guildId);
    if (isOccupied) {
      return {
        content: isOccupied,
        ephemeral: true,
      };
    }

    const stmt = db.prepare(
      "INSERT INTO active_tags(key, player_relation) VALUES(?, ?)"
    );
    stmt.run("FISH", player.id);

    ActivityService.scheduleActivity("FISH", { guildId, player });

    return {
      content: `${player.name} has taken the fishing rod and cast it into the water, they wait patiently...`,
      ephemeral: false,
    };
  }

  async endJob(guildId, player) {
    try {
      const stmt = db.prepare(
        "DELETE FROM active_tags WHERE player_relation = ? AND key = ?"
      );
      stmt.run(player.id, "FISH");

      SkillService.increaseXP(player.id, "FISH");

      const catches = await ItemService.randomItemByLootTag("FISH");

      await ItemService.addToInventory(guildId, catches.key, player.id);

      return catches;
    } catch (error) {
      console.error(error);
    }
  }

  async announceEnd(interaction) {
    const catches = await this.endJob(interaction.guildId, interaction.player);

    const bot = new BotService();
    const foghorn = bot.getChannelByName(
      interaction.guildId,
      process.env.NOTICHANNEL
    );

    const fishEmbed = new EmbedBuilder()
      .setColor(0x0077be)
      .setTitle(`${interaction.player.name} has finished Fishing!`)
      .setDescription("I wonder what they caught...")
      .addFields(
        { name: "Caught:", value: `${catches.name}\n${catches.description}` },
        { name: "Experience:", value: "++Fishing" }
      );

    foghorn.send({ embeds: [fishEmbed] });
  }
}
export default new FishService();
