import { ToadScheduler, SimpleIntervalJob, Task } from "toad-scheduler";
import db from "../../database/database.js";
import FlavorService from "./FlavorService.js";
import BotService from "./BotService.js";

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
}

export default new GameEventService();
