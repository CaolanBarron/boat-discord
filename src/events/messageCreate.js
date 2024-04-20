import { Events } from "discord.js";
import Database from "better-sqlite3";
const db = new Database(process.env.DATABASEURL);
export default {
  name: Events.MessageCreate,
  async execute(interaction) {
    try {
      // Check if the channel is correct and that the message was not sent by this bot
      if (
        interaction.channel.name !== process.env.GAMEPLAYCHANNEL ||
        interaction.author.username === process.env.BOTNAME
      )
        return;

      // TODO: Check if the user has character here and keep the character
      const user = db
        .prepare("SELECT * FROM player WHERE user_id = ? AND boat_id = ?")
        .get(interaction.author.id, interaction.guildId);

      if (!user) {
        const guild = db
          .prepare("SELECT * FROM boat WHERE id = ?")
          .get(interaction.guildId);
        const error = new Error();
        if (!guild) {
          error.message = "This server does not have a boat present.";
        } else {
          error.message =
            "You do not have a character at the moment. Use the `/create` command.";
        }
        throw error;
      }

      // TODO: Change this to be the actual characters name
      const characterName = user.name;
      getFlavor(interaction, characterName);
    } catch (error) {
      console.error(error.message);
      await interaction.reply({ content: error.message, ephemeral: true });
    }
  },
};

function getFlavor(interaction, characterName) {
  try {
    String.prototype.format = function () {
      var args = arguments;
      return this.replace(/{([0-9]+)}/g, function (match, index) {
        return typeof args[index] == "undefined" ? match : args[index];
      });
    };

    const stmt = db.prepare("SELECT * FROM flavor").all();

    const randomFlavor = Math.floor(Math.random() * stmt.length);

    interaction.channel.send(
      stmt[randomFlavor].content.format(interaction.content, characterName)
    );
    interaction.delete();
  } catch (error) {
    console.error(error);
  }
}
