import { Events } from "discord.js";
import BotService from "../services/BotService.js";

export default {
  name: Events.ClientReady,
  once: true,
  async execute(readyClient) {
    BotService.restartActivities();
    console.log(`Ready! Logged in as ${readyClient.user.tag}`);
  },
};
