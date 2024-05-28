import { ToadScheduler, SimpleIntervalJob, Task } from "toad-scheduler";
import db from "../../database/database.js";
import FlavorService from "./FlavorService.js";
import BotService from "./BotService.js";
import { ActionRowBuilder, ButtonBuilder, ButtonStyle } from "discord.js";

class GameEventService {
  async startFlavorIntervals(guildIds) {
    const scheduler = new ToadScheduler();

    const boats = db().prepare("SELECT * FROM boat").all();
    const boatIds = boats.map((boat) => boat.id);

    for (const guild of guildIds) {
      if (!boatIds.includes(guild)) continue;
      const task = new Task(`${guild}_boat_flavor`, async () => {
        const flavor = FlavorService.getBoatFlavor();

        const channel = await BotService.getChannelByName(
          guild,
          process.env.GAMEPLAYCHANNEL
        );

        await channel.send(flavor);
      });
      const job = new SimpleIntervalJob({ seconds: 20 }, task);

      scheduler.addSimpleIntervalJob(job);
    }
  }

  async startPromptIntervals(guildIds) {
    const scheduler = new ToadScheduler();

    const boats = db().prepare("SELECT * FROM boat").all();
    const boatIds = boats.map((boat) => boat.id);

    for (const guild of guildIds) {
      if (!boatIds.includes(guild)) continue;

      const task = new Task(`${guild}_prompt`, async () => {
        const users = db()
          .prepare(`SELECT * FROM player WHERE boat_id = ?`)
          .all(guild);

        if (users.length === 0) return;

        const row = new ActionRowBuilder();
        const button = new ButtonBuilder()
          .setCustomId("asdasd")
          .setLabel("label")
          .setStyle(ButtonStyle.Primary);
        row.addComponents(button);

        const channel = await BotService.getChannelByName(
          guild,
          process.env.GAMEPLAYCHANNEL
        );

        await channel.send({ content: "Test", components: [row] });
      });

      const job = new SimpleIntervalJob({ seconds: 20 }, task);

      scheduler.addSimpleIntervalJob(job);
    }
  }
}

export default new GameEventService();
