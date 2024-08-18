import { db } from './db.js';
import * as schemas from './schemas/index.js';
import * as gameMechanics from './base-seed/gameMechanics.js';
import { prompts } from './base-seed/content.js';
export const seedDB = async () => {
    // Do a simple check if the database has data
    const dataExists = await db.query.tag.findFirst();
    if (dataExists) {
        console.error('This database has data in it already.');
        return;
    }
    const mechanicsData = await db.transaction(async (tx) => {
        const tags = await tx
            .insert(schemas.tag)
            .values(gameMechanics.tag)
            .returning();

        const flavors = await tx
            .insert(schemas.flavor)
            .values(gameMechanics.flavor)
            .returning();

        const skills = await tx
            .insert(schemas.skill)
            .values(gameMechanics.skill)
            .returning();

        const biomes = await tx
            .insert(schemas.biome)
            .values(gameMechanics.biome)
            .returning();

        const biomeCoords = await tx
            .insert(schemas.biomeCoords)
            .values(gameMechanics.biomeCoords)
            .returning();

        const items = await tx
            .insert(schemas.item)
            .values(gameMechanics.item)
            .returning();

        const itemTransformation = await tx
            .insert(schemas.itemTransformation)
            .values(gameMechanics.itemTransformation)
            .returning();

        const uses = await tx
            .insert(schemas.use)
            .values(gameMechanics.use)
            .returning();

        const itemUses = await tx
            .insert(schemas.itemUses)
            .values(gameMechanics.itemUse)
            .returning();

        const loot = await tx
            .insert(schemas.loot)
            .values(gameMechanics.loot)
            .returning();

        const lootItems = await tx
            .insert(schemas.lootItem)
            .values(gameMechanics.lootItem)
            .returning();

        const activities = await tx
            .insert(schemas.activities)
            .values(gameMechanics.activities)
            .returning();

        const effects = await tx
            .insert(schemas.effect)
            .values(gameMechanics.effect)
            .returning();

        return {
            tags,
            flavors,
            skills,
            biomes,
            biomeCoords,
            items,
            itemTransformation,
            uses,
            itemUses,
            loot,
            lootItems,
            activities,
            effects,
        };
    });
    // SEED CONTENT
    // - prompt message
    // - prompt action
    // - prompt outcome
    for (const message of prompts) {
        await db.transaction(async (tx) => {
            const [newPromptMessage] = await tx
                .insert(schemas.promptMessage)
                .values({ content: message.content })
                .returning();
            for (const action of message.actions) {
                const [newPromptAction] = await tx
                    .insert(schemas.promptAction)
                    .values({
                        messageId: newPromptMessage.id,
                        content: action.content,
                        challengeSkill: action.challenge_skill,
                        challengeValue: action.challenge_value,
                    })
                    .returning();
                for (const outcome of action.outcomes) {
                    await tx
                        .insert(schemas.promptOutcome)
                        .values({ actionId: newPromptAction.id, ...outcome });
                }
            }
        });
    }
};
seedDB();
