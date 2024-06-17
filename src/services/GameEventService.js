import { ToadScheduler, SimpleIntervalJob, Task } from 'toad-scheduler';
import db from '../../database/database.js';
import FlavorService from './FlavorService.js';
import BotService from './BotService.js';
import PromptService from './PromptService.js';
import TreasureService from './TreasureService.js';

class GameEventService {
    constructor() {
        this.scheduler = new ToadScheduler();
    }
    async startFlavorIntervals(guildIds) {
        const boats = db().prepare('SELECT * FROM boat').all();
        const boatIds = boats.map((boat) => boat.id);

        for (const guild of guildIds) {
            if (!boatIds.includes(guild)) continue;
            console.log(`Spinning up flavor interval for ${guild}`);

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
            const job = new SimpleIntervalJob({ seconds: 3000 }, task);

            this.scheduler.addSimpleIntervalJob(job);
        }
    }

    async startPromptIntervals(guildIds) {
        const boats = db().prepare('SELECT * FROM boat').all();
        const boatIds = boats.map((boat) => boat.id);

        for (const guild of guildIds) {
            if (!boatIds.includes(guild)) continue;
            console.log(`Spinning up prompt interval for ${guild}`);

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

            const job = new SimpleIntervalJob({ seconds: 1800 }, task);

            this.scheduler.addSimpleIntervalJob(job);
        }
    }

    async startTreasureShufflesIntervals(guildIds) {
        const boats = db().prepare('SELECT * FROM boat').all();
        const boatIds = boats.map((boat) => boat.id);

        for (const guild of guildIds) {
            if (!boatIds.includes(guild)) continue;
            console.log(`Spinning up Treasure Shuffle Interval for ${guild}`);

            const task = new Task(`${guild}_boat_treasure`, async () => {
                await TreasureService.shuffleTreasure(guild);
            });
            const job = new SimpleIntervalJob({ seconds: 180 }, task);

            this.scheduler.addSimpleIntervalJob(job);
        }
    }
}

export default new GameEventService();
