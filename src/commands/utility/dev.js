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
          { name: "boat", value: "tool_boat" }
        )
    ),

  async execute(interaction) {
    console.log(interaction.options.getString("tools"));
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
          content: `map:\n🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦\n
🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦\n
🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦\n
🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦\n
🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦\n
🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦\n
🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦\n
🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦\n
🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦\n
🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦\n
🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦\n
🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦\n
🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦\n
🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦\n
🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦\n
🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦\n
🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦\n
🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦\n
🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦\n
🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦`,
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
  const map = [];

  for (let outer = 0; outer < 20; outer++) {
    const row = [];
    for (let inner = 0; inner < 20; inner++) {
      row.push("🟦");
    }
    map.push(row);
  }

  const { boats, biomes } = mapData;

  // step through boats and add each of them to the map

  for (const boat of boats) {
    map[boat.y_coord][boat.x_coord] = "⛵";
  }

  // step through biomes and add each of them to the map

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

function getMapData() {}
