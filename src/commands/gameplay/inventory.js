import { SlashCommandBuilder } from "discord.js";

export default {
  data: new SlashCommandBuilder()
    .setName("inventory")
    .setDescription("Display the current boats inventory"),
  async execute() {},
};
