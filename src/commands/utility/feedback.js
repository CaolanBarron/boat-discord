import { SlashCommandBuilder } from "discord.js";
import db from "../../../database/database.js";

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
