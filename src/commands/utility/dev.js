import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  Guild,
  ModalBuilder,
  SlashCommandBuilder,
  TextInputBuilder,
  TextInputStyle,
} from "discord.js";
import { stripIndent } from "common-tags";
import BoatService from "../../services/BoatService.js";
import Database from "better-sqlite3";
const db = new Database(process.env.DATABASEURL);

export default {
  data: new SlashCommandBuilder()
    .setName("dev")
    .setDescription("Tools for the developer. Player no touch!!")
    .addStringOption((option) =>
      option
        .setName("tools")
        .setDescription("Tools")
        .setRequired(true)
        .addChoices(
          { name: "map", value: "tool_map" },
          { name: "boat", value: "tool_boat" }
        )
    ),

  async execute(interaction) {
    const row = new ActionRowBuilder();
    let content = "Which tool would you like to use?";
    switch (interaction.options.getString("tools")) {
      case "tool_map":
        const displayMapButton = new ButtonBuilder()
          .setCustomId("dev_display_map")
          .setLabel("Display Map")
          .setStyle(ButtonStyle.Primary);

        const inspectMapButton = new ButtonBuilder()
          .setCustomId("dev_inspect_map")
          .setLabel("Inspect Map")
          .setStyle(ButtonStyle.Primary);

        const displayMapLegendButton = new ButtonBuilder()
          .setCustomId("dev_legend_map")
          .setLabel("Map Legend")
          .setStyle(ButtonStyle.Primary);

        row.addComponents(
          displayMapButton,
          inspectMapButton,
          displayMapLegendButton
        );
        break;

      case "tool_boat":
        const createBoat = new ButtonBuilder()
          .setCustomId("dev_create_boat")
          .setLabel("Create Boat")
          .setStyle(ButtonStyle.Primary);
        row.addComponents(createBoat);
        break;
    }

    const response = await interaction.reply({
      content,
      components: [row],
    });

    const collectorFilter = (i) => i.user.id === interaction.user.id;

    try {
      const confirmation = await response.awaitMessageComponent({
        filter: collectorFilter,
        time: 60_000,
      });
      switch (confirmation.customId) {
        case "dev_display_map":
          await confirmation.update({
            content: "```" + (await generateMap(getMapData())) + "```",
            components: [],
          });
          break;
        case "dev_inspect_map":
          const collectorFilter = (m) => m.author.id === interaction.user.id;
          const collector = interaction.channel.createMessageCollector({
            filter: collectorFilter,
            time: 15_000,
          });

          await confirmation.deferReply();

          collector.on("collect", async (m) => {
            const coords = m.content.split(" ");
            const result = await inspectMap(coords[0], coords[1]);
            await confirmation.editReply({
              content: result,
              components: [],
            });
            collector.stop();
          });

          collector.on("end", (collector) => {
            console.log("Dev map inspector finished");
          });
          break;
        case "dev_legend_map":
          await confirmation.update({
            content: stripIndent`
            Boat: ⛵
            Swamp Biome: 🟤
            Void Biome: ⚫
            Cardinal Line: ⬜
            `,
            component: [],
          });
          break;
        case "dev_create_boat":
          await confirmation.update({
            content: await createBoat(confirmation.guildId),
            components: [],
          });
          break;
      }
    } catch (error) {
      console.error(error);
      await interaction.editReply({
        content: error,
        components: [],
      });
    }
  },
};

// mapData function injected
// Should return an object of data
// {
//    boats: [],
//    biomes: []
// }
export async function generateMap(mapData) {
  try {
    const map = {};

    const gridSize = 20;
    const gridCenter = Math.floor(gridSize / 2);
    for (let outer = -gridCenter; outer <= gridCenter; outer++) {
      map[outer] = {};
      for (let inner = -gridCenter; inner <= gridCenter; inner++) {
        if (outer === 0 || inner === 0) map[outer][inner] = "⬜";
        else map[outer][inner] = "🟦";
      }
    }

    const { boats, biomes } = mapData;

    // step through biomes and add each of them to the map
    for (const biome of biomes) {
      const x = biome.x_coord;
      const y = biome.y_coord;
      switch (biome.biome_key) {
        case "VOID":
          map[y][x] = "⚫";
          break;
        case "SWAMP":
          map[y][x] = "🟤";
          break;
        default:
          map[y][x] = "❓";
          break;
      }
    }

    // step through boats and add each of them to the map

    for (const boat of boats) {
      const x = boat.x_coord;
      const y = boat.y_coord;
      map[y][x] = "⛵";
    }

    // construct map into a single string
    let finalMap = "";
    for (let outer = gridCenter; outer >= -gridCenter; outer--) {
      let row = "";
      for (let inner = -gridCenter; inner <= gridCenter; inner++) {
        row = row.concat(map[outer][inner]);
      }
      finalMap = finalMap.concat(row + "\n");
    }
    return finalMap;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

function getMapData() {
  const boatStmt = db.prepare("SELECT * FROM boat").all();
  const biomeStmt = db.prepare("SELECT * FROM biome_coords").all();
  return {
    boats: boatStmt,
    biomes: biomeStmt,
  };
}

async function inspectMap(x, y) {
  try {
    // Find all boats on this coordinate
    // Find all biomes on this cooridnate
    // Return this data in a nicely formatted way
    const boatStmt = db
      .prepare("SELECT * FROM boat WHERE x_coord = ? AND y_coord = ?")
      .all(x, y);

    let result = "";
    for (const boat of boatStmt) {
      result = result.concat(
        `Boat:   
        - ${boat.id}\n`
      );
    }

    const biomeStmt = db
      .prepare("SELECT * FROM biome_coords WHERE x_coord = ? AND y_coord = ?")
      .get(x, y);

    if (biomeStmt) {
      result = result.concat(`Biome: ${biomeStmt.biome_key}\n`);
    } else {
      result = result.concat(`Biome: Open sea\n`);
    }
    return result;
  } catch (e) {
    console.error(e);
    return "Error with coordinate input, do better";
  }
}

async function createBoat(guildId) {
  const guildStmt = db
    .prepare("SELECT * FROM boat WHERE id = ?")
    .get(guildId.guildId);
  if (!guildStmt) {
    BoatService.create(guildId, 10, 5, 0, 0);
    return "A new boat has succesfully been created";
  } else {
    return "This server already has a boat";
  }
}
