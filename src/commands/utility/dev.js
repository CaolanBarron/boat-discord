import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  SlashCommandBuilder,
} from "discord.js";

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
          { name: "boat", value: "tool_boat" },
        ),
    ),

  async execute(interaction) {
    const row = new ActionRowBuilder();
    switch (interaction.options.getString("tools")) {
      case "tool_map":
        const displayMapButton = new ButtonBuilder()
          .setCustomId("dev_display_map")
          .setLabel("Display Map")
          .setStyle(ButtonStyle.Primary);

        row.addComponents(displayMapButton);
        break;
    }

    const response = await interaction.reply({ components: [row] });

    const collectorFilter = (i) => i.user.id === interaction.user.id;

    try {
      const confirmation = await response.awaitMessageComponent({
        filter: collectorFilter,
        time: 60_000,
      });
      if (confirmation.customId === "dev_display_map") {
        await confirmation.update({
          content: "```" + generateMap(getMapData()) + "```",
          components: [],
        });
      }
    } catch (error) {
      console.error(error);
      await interaction.editReply({
        content: "Confirmation not recieved within 1 minute, cancelling",
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
export function generateMap(mapData) {
  const map = {};

  const gridSize = 20;
  const gridCenter = Math.floor(gridSize / 2);
  for (let outer = -gridCenter; outer <= gridCenter; outer++) {
    map[outer] = {};
    for (let inner = -gridCenter; inner <= gridCenter; inner++) {
      if (outer === 0 || inner === 0) map[outer][inner] = "⬜";
      else map[outer][inner] = "🟦";
    }
    console.log(map);
  }
  const convertCoords = (x, y) => {
    const mid = Math.floor(gridSize / 2);
    const x_coord = x + mid - 1;
    const y_coord = y + mid - 1;
    return { x_coord, y_coord };
  };

  const { boats, biomes } = mapData;

  // step through biomes and add each of them to the map

  // step through boats and add each of them to the map

  for (const boat of boats) {
    const location = convertCoords(boat.x_coord, boat.y_coord);
    map[location.y_coord][location.x_coord] = "⛵";
  }

  // construct map into a single string
  let finalMap = "";
  for (const outterPiece of map) {
    let row = "";
    for (const innerPiece of outterPiece) {
      row = row.concat(innerPiece);
    }
    finalMap = finalMap.concat(row + "\n");
  }
  console.log(finalMap);
  return finalMap;
}

function getMapData() {
  return {
    boats: [{ x_coord: 1, y_coord: 1 }],
  };
}
