import { Events } from "discord.js";
import BotService from "../services/BotService.js";
import GameEventService from "../services/GameEventService.js";

export default {
  name: Events.ClientReady,
  once: true,
  async execute(readyClient) {
    const guildIds = client.guilds.cache.map((guild) => guild.id);
    if (guildIds.length > 0) {
      GameEventService.startFlavorIntervals(guildIds);
      GameEventService.startPromptIntervals(guildIds);
    }

    BotService.restartActivities();
    console.log(`Ready! Logged in as ${readyClient.user.tag}`);
  },
};
