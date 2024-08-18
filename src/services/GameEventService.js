import { ToadScheduler, SimpleIntervalJob, Task } from 'toad-scheduler';
import db from '../../database/database.js';
import FlavorService from './FlavorService.js';
import BotService from './BotService.js';
import PromptService from './PromptService.js';
import TreasureService from './TreasureService.js';
import { sqlPlaceholder } from './Utils.js';

class GameEventService {
    constructor() {
        this.scheduler = new ToadScheduler();
    }

    async startFlavorIntervals(guildIds) {
        const boats = db().prepare('SELECT * FROM boat').all();
        const boatIds = boats.map((boat) => boat.id);

        for (const guild of guildIds) {
            if (!boatIds.includes(guild)) continue;
            if (process.env.NODE_ENV !== 'test') {
                console.log(`Spinning up flavor interval for ${guild}`);
            }
            const jobId = `${guild}_boat_flavor`;
            const task = new Task(jobId, async () => {
                // Do not send a event half the amount of times
                if (Math.random() < 0.5) return;
                const flavor = FlavorService.getBoatFlavor(guild);

                const channel = await BotService.getChannelByName(
                    guild,
                    process.env.GAMEPLAYCHANNEL,
                );

                await channel.send(flavor);
            });
            const job = new SimpleIntervalJob({ seconds: 3000 }, task, {
                id: jobId,
            });

            this.scheduler.addSimpleIntervalJob(job);
        }
    }

    async startPromptIntervals(guildIds) {
        const boats = db().prepare('SELECT * FROM boat').all();
        const boatIds = boats.map((boat) => boat.id);

        for (const guild of guildIds) {
            if (!boatIds.includes(guild)) continue;
            if (process.env.NODE_ENV !== 'test') {
                console.log(`Spinning up prompt interval for ${guild}`);
            }

            const jobId = `${guild}_prompt`;
            const task = new Task(jobId, async () => {
                if (Math.random() < 0.5) return;
                const users = db()
                    .prepare('SELECT * FROM player WHERE boat_id = ?')
                    .all(guild);

                const isSailing = db()
                    .prepare(
                        `SELECT key FROM
                active_tags 
                JOIN player 
                ON player.id = active_tags.player_id 
                WHERE player.boat_id = ? AND key IN ${sqlPlaceholder(4)}`,
                    )
                    .get(
                        guild,
                        'NORTH_SAILING',
                        'SOUTH_SAILING',
                        'WEST_SAILING',
                        'EAST_SAILING',
                    );

                let promptTag = null;
                if (isSailing) {
                    promptTag = 'SAILING';
                }
                if (users.length === 0) return;

                const promptMessage =
                    await PromptService.getRandomPrompt(promptTag);

                const channel = await BotService.getChannelByName(
                    guild,
                    process.env.GAMEPLAYCHANNEL,
                );

                await channel.send(promptMessage);
            });

            const job = new SimpleIntervalJob({ seconds: 1800 }, task, {
                id: jobId,
            });

            this.scheduler.addSimpleIntervalJob(job);
        }
    }

    async startTreasureShufflesIntervals(guildIds) {
        const boats = db().prepare('SELECT * FROM boat').all();
        const boatIds = boats.map((boat) => boat.id);

        for (const guild of guildIds) {
            if (!boatIds.includes(guild)) continue;
            if (process.env.NODE_ENV !== 'test') {
                console.log(
                    `Spinning up Treasure Shuffle Interval for ${guild}`,
                );
            }

            const jobId = `${guild}_boat_treasure`;
            const task = new Task(jobId, async () => {
                await TreasureService.shuffleTreasure(guild);
            });
            const job = new SimpleIntervalJob({ seconds: 180 }, task, {
                id: jobId,
            });

            this.scheduler.addSimpleIntervalJob(job);
        }
    }
}

export default new GameEventService();
