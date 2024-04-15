const { SlashCommandBuilder } = require("discord.js");
const db = require("better-sqlite3")(process.env.DATABASEURL);

module.exports = {
  data: new SlashCommandBuilder()
    .setName("create")
    .setDescription("Creates a player character!")
    .addStringOption((option) =>
      option
        .setName("name")
        .setDescription("The player characters name")
        .setRequired(true)
    ),
  async execute(interaction) {
    try {
      const checkStmt = db.prepare("SELECT * FROM player WHERE id = ?");
      const checkResult = checkStmt.get(interaction.user.id);
      if (checkResult) {
        interaction.reply({
          content: "You already have a character created",
          ephemeral: true,
        });
        return;
      }
      const characterName = interaction.options.getString("name");
      const inStmt = db.prepare("INSERT INTO player(id, name) VALUES (?, ?)");
      inStmt.run(interaction.user.id, characterName);

      await interaction.reply(`${characterName}... You are now on the boat.`);
    } catch (error) {
      console.error(error);
    }
  },
};
