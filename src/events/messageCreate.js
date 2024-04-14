const { Events } = require("discord.js");

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
      interaction.channel.send(`"${interaction.content}"`);
      interaction.delete();
    } catch (error) {
      console.error(error.message);
    }
  },
};
