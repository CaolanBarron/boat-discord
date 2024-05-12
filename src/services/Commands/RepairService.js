import ActivityService from "../ActivityService.js";
import SkillService from "../SkillService.js";
import BotService from "../BotService.js";
import { EmbedBuilder } from "@discordjs/builders";
import db from "../../../database/database.js";

class RepairService {
  async start(guildId, player) {
    const isBusy = ActivityService.checkActive(player.id, "REPAIR");
    if (isBusy) {
      return {
        content: isBusy,
        ephemeral: true,
      };
    }

    const isOccupied = await ActivityService.checkOccupied("REPAIR", guildId);
    if (isOccupied) {
      return {
        content: isOccupied,
        ephemeral: true,
      };
    }

    const insertStmt = db.prepare(
      "INSERT INTO active_tags(key, player_relation) VALUES(?,?)"
    );
    insertStmt.run("REPAIR", player.id);

    ActivityService.scheduleActivity("REPAIR", { guildId, player });

    return {
      content: `${player.name} unhooks the latches of their toolbox and gets to work.`,
      ephemeral: false,
    };
  }

  async endJob(guildId, player) {
    try {
      const stmt = db.prepare(
        "DELETE FROM active_tags WHERE player_relation = ? AND key = ?"
      );
      stmt.run(player.id, "REPAIR");

      SkillService.increaseXP(player.id, "REPAIR");

      // TODO: Handle boat repairs and buffing here
      return "Boat fixed";
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

    const repairEmbed = new EmbedBuilder()
      .setColor(0x0077be)
      .setTitle(`${interaction.player.name} has finished their repairs!`)
      .setDescription("The fixes look stable enough")
      .addFields(
        {
          name: "Effects:",
          value: `${results}`,
        },
        { name: "Experience:", value: "++Repair" }
      );

    foghorn.send({ embeds: [repairEmbed] });
  }
}

export default new RepairService();
