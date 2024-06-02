import { SlashCommandBuilder } from "discord.js";
import db from "../../../database/database.js";

export default {
  data: new SlashCommandBuilder()
    .setName("survey")
    .setDescription("Describes the environment around The Boat."),
  async execute(interaction) {
    try {
      const boat = db()
        .prepare(
          `SELECT * 
        FROM boat 
        LEFT JOIN biome_coords 
        ON boat.x_coord = biome_coords.x_coord AND boat.y_coord = biome_coords.y_coord 
        LEFT JOIN biome ON biome_coords.biome_key = biome.key 
        WHERE boat.id = ?`
        )
        .get(interaction.guildId);

      let response = "The Boat is currently in a nondescript part of the ocean";

      if (boat.biome_key)
        response = `The Boat is currently in the ${boat.name} biome.`;
      await interaction.reply({ content: response, ephemeral: true });
    } catch (error) {
      console.error(error);
    }
  },
};
