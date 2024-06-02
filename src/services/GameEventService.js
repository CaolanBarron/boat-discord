import { ToadScheduler, SimpleIntervalJob, Task } from "toad-scheduler";
import db from "../../database/database.js";
import FlavorService from "./FlavorService.js";
import BotService from "./BotService.js";
import { ActionRowBuilder, ButtonBuilder, ButtonStyle } from "discord.js";
import PromptService from "./PromptService.js";

class GameEventService {
  async startFlavorIntervals(guildIds) {
    const scheduler = new ToadScheduler();

    const boats = db().prepare("SELECT * FROM boat").all();
    const boatIds = boats.map((boat) => boat.id);

    for (const guild of guildIds) {
      if (!boatIds.includes(guild)) continue;
      const task = new Task(`${guild}_boat_flavor`, async () => {
        // Do not send a event half the amount of times
        if (Math.random() < 0.5) return;
        const flavor = FlavorService.getBoatFlavor(guild);

        const channel = await BotService.getChannelByName(
          guild,
          process.env.GAMEPLAYCHANNEL
        );

        await channel.send(flavor);
      });
      const job = new SimpleIntervalJob({ seconds: 300 }, task);

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
        // Do not send a event half the amount of times
        if (Math.random() < 0.5) return;
        const users = db()
          .prepare(`SELECT * FROM player WHERE boat_id = ?`)
          .all(guild);

        if (users.length === 0) return;

        const promptMessage = await PromptService.getRandomPrompt();

        const channel = await BotService.getChannelByName(
          guild,
          process.env.GAMEPLAYCHANNEL
        );

        await channel.send(promptMessage);
      });

      const job = new SimpleIntervalJob({ seconds: 10 }, task);

      scheduler.addSimpleIntervalJob(job);
    }
  }
}

export default new GameEventService();
