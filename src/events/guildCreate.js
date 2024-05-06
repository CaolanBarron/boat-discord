import { Events } from "discord.js";
import BotService from "../services/BotService.js";
import BoatService from "../services/BoatService.js";
export default {
  name: Events.GuildCreate,
  async execute(created) {
    // Validate that all required channels exist
    const deckChannel = BotService.getChannelByName(
      created.id,
      process.env.GAMEPLAYCHANNEL
    );
    const foghornChannel = BotService.getChannelByName(
      created.id,
      process.env.NOTICHANNEL
    );
    if (!deckChannel || !foghornChannel) {
      console.error(
        `This server: ${created.name} is missing the required channels`
      );
      return;
    }
    BoatService.create(created.id);
    await deckChannel.send(BoatService.introductionNarrativeMessage());
    await foghornChannel.send(BoatService.introductionGameplayMessage());
  },
};
