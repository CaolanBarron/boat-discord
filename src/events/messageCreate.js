const { Events } = require("discord.js");
const db = require("better-sqlite3")(process.env.DATABASEURL);

module.exports = {
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

      // TODO: Change this to be the actual characters name
      const characterName = interaction.author.username;
      getFlavor(interaction, characterName);
    } catch (error) {
      console.error(error.message);
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
