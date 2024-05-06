import { Events } from "discord.js";
import BotService from "../services/BotService.js";
import schedule from "node-schedule";

export default {
  name: Events.ClientReady,
  once: true,
  async execute(readyClient) {
    BotService.restartActivities();
    console.log(schedule.scheduledJobs);
    console.log(`Ready! Logged in as ${readyClient.user.tag}`);
  },
};
