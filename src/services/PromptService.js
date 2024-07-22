import { ActionRowBuilder } from '@discordjs/builders';
import db from '../../database/database.js';
import { ButtonBuilder, ButtonStyle, Colors, EmbedBuilder } from 'discord.js';
import SkillService from './SkillService.js';
import EffectService from './EffectService.js';

// TODO: Implement sailing prompts
class PromptService {
    async getRandomPrompt() {
        try {
            const messages = db().prepare('SELECT * FROM prompt_message').all();

            const randomMessage =
                messages[Math.floor(Math.random() * messages.length)];

            const messageActions = db()
                .prepare('SELECT * FROM prompt_action WHERE message_id = ?')
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
                .setTitle('Something happened on The Boat...')
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
    WHERE pa.id = ?`,
            )
            .all(actionId);

        let response;
        // Check if the action has a challenge_skill
        // if it does then get the users relevant skill and check it against the value
        if (outcomes[0].challenge_skill) {
            const skillXP = await SkillService.getSkillXP(
                player.id,
                outcomes[0].challenge_skill,
            );
            const skillLevel = await SkillService.getCurrentLevel(skillXP);

            if (skillLevel > outcomes[0].challenge_value) {
                [response] = outcomes.filter(
                    (i) => i.outcome_type === 'SUCCESS',
                );
            } else {
                [response] = outcomes.filter(
                    (i) => i.outcome_type === 'FAILURE',
                );
            }
        }

        // if it doesn't there should only be one item
        if (outcomes.length === 1) {
            response = outcomes[0];
        }

        if (response.effect_id) {
            await EffectService.applyEffect(boatId, response.effect_id);
        }
        // return the final response content/other info

        return response;
    }
}

export default new PromptService();
