import { SlashCommandBuilder } from "discord.js";
import Database from "better-sqlite3";
const db = new Database(process.env.DATABASEURL);

export default {
  data: new SlashCommandBuilder()
    .setName("feedback")
    .setDescription("Send feedback to the developer!")
    .addStringOption((option) =>
      option.setName("message").setDescription("Message with feedback")
    ),
  async execute(interaction) {
    const feedbackStmt = db.prepare(
      "INSERT INTO feedback(player_name, message) VALUES (?, ?)"
    );
    feedbackStmt.run(
      interaction.user.username,
      interaction.options.getString("message")
    );
    interaction.reply({
      content: "Thank you! Your feedback has been logged!",
      ephemeral: true,
    });
  },
};
