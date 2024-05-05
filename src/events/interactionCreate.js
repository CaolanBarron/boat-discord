import { Events, AttachmentBuilder, EmbedBuilder } from "discord.js";
import Database from "better-sqlite3";
const db = new Database(process.env.DATABASEURL);

export default {
  name: Events.InteractionCreate,
  async execute(interaction) {
    try {
      if (!interaction.isChatInputCommand()) return;

      // TODO: check here if the user exists and if the server has a boat already

      const user = db
        .prepare("SELECT * FROM player WHERE user_id = ? AND boat_id = ?")
        .get(interaction.user.id, interaction.guildId);

      if (!user) {
        const guild = db
          .prepare("SELECT * FROM boat WHERE id = ?")
          .get(interaction.guildId);
        const error = new Error();
        if (!guild) {
          error.message =
            interaction.commandName === "dev"
              ? "IGNORE"
              : "This server does not have a boat present.";
        } else {
          error.message =
            interaction.commandName === "create"
              ? "IGNORE"
              : "You do not have a character at the moment. Use the `/create` command.";
        }
        if (error.message !== "IGNORE") throw error;
      }

      interaction.player = user;

      if (
        interaction.channel.name !== process.env.GAMEPLAYCHANNEL &&
        interaction.commandName !== "dev"
      ) {
        const file = new AttachmentBuilder("src/assets/landlubber.jpg");
        const embed = new EmbedBuilder()
          .setTitle("Landlubber")
          .setImage("attachment://landlubber.jpg");
        await interaction.reply({ embeds: [embed], files: [file] });
        return;
      }
      const command = interaction.client.commands.get(interaction.commandName);
      if (!command) {
        console.error(
          `No command matching ${interaction.commandName} was found.`
        );
        return;
      }

      await command.execute(interaction);
    } catch (error) {
      console.error(error);
      if (interaction.replied || interaction.deferred) {
        await interaction.followUp({
          content: "There was an error while executing this command!",
          ephemeral: true,
        });
      } else {
        await interaction.reply({
          content: "There was an error while executing this command!",
          ephemeral: true,
        });
      }
    }
  },
};
