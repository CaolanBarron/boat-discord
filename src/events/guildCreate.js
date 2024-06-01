import { Events } from "discord.js";
import BotService from "../services/BotService.js";
import BoatService from "../services/BoatService.js";
import db from "../../database/database.js";
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
    // check if the boat already exists, only create one if it does not
    const boatExists = db()
      .prepare(`SELECT * FROM boat WHERE id = ?`)
      .get(created.id);
    BoatService.create(created.id);
    await deckChannel.send(BoatService.introductionNarrativeMessage());
    await foghornChannel.send(BoatService.introductionGameplayMessage());
  },
};
