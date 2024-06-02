import { ActionRowBuilder } from "@discordjs/builders";
import db from "../../database/database.js";
import { ButtonBuilder, ButtonStyle, Colors, EmbedBuilder } from "discord.js";
import BoatService from "./BoatService.js";

class PromptService {
  async getRandomPrompt() {
    try {
      const messages = db().prepare("SELECT * FROM prompt_message").all();

      const randomMessage =
        messages[Math.floor(Math.random() * messages.length)];

      const messageActions = db()
        .prepare(`SELECT * FROM prompt_action WHERE message_id = ?`)
        .all(randomMessage.id);

      const row = new ActionRowBuilder();

      for (const action of messageActions) {
        const button = new ButtonBuilder()
          .setCustomId(`prompt_${action.id.toString()}`)
          .setLabel(action.content)
          .setStyle(ButtonStyle.Primary);
        row.addComponents(button);
      }

      const embed = new EmbedBuilder()
        .setTitle("Something happened on The Boat...")
        .setDescription(randomMessage.content)
        .setColor(Colors.Blue);
      return { embeds: [embed], components: [row] };
    } catch (e) {
      console.error(e);
    }
  }

  async chooseAction(actionId, player, boatId) {
    const outcomes = db()
      .prepare(
        `
    SELECT * 
    FROM prompt_action pa 
    JOIN prompt_outcome po
    ON po.action_id = pa.id
    WHERE pa.id = ?`
      )
      .all(actionId);

    let response;
    // Check if the action has a challenge_skill
    // if it does then get the users relevant skill and check it against the value
    if (outcomes[0].challenge_skill) {
      const playerSkills = db()
        .prepare(
          `SELECT * FROM player_skills WHERE player_id = ? AND skill_key = ?`
        )
        .get(player.id, outcomes[0].challenge_skill);

      if (playerSkills.xp > outcomes[0].challenge_value) {
        [response] = outcomes.filter((i) => i.outcome_type === "SUCCESS");
      } else {
        [response] = outcomes.filter((i) => i.outcome_type === "FAILURE");
      }
    }

    // if it doesn't there should only be one item
    if (outcomes.length === 1) {
      response = outcomes[0];
    }
    // TODO: if the final outcome has an effect_id apply it to the boat/player

    if (response.effect_id) {
      BoatService.applyEffect(boatId, response.effect_id);
    }
    // return the final response content/other info

    return response;
  }
}

export default new PromptService();
