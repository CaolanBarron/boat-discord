import { Events } from 'discord.js';
import BoatService from '../services/BoatService.js';

export default {
    name: Events.GuildDelete,
    async execute(deleted) {
        // BoatService.delete(deleted.id);
    },
};
