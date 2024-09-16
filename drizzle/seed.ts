import { db } from './db';
import * as schemas from './schemas';
import * as gameMechanics from './base-seed/gameMechanics';
import { prompts } from './base-seed/content';
import { eq, sql } from '../node_modules/drizzle-orm/index';
import { tag } from './schemas/tag';

export const seedDB = async () => {
    // Do a simple check if the database has data

    await db.run(sql.raw('PRAGMA foreign_keys=OFF;'));

    const result = sql.raw(
        `SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE '__drizzle_migrations' ;`,
    );
    const tableNames = await db.all(result).map((r: any) => r.name);
    for (const tableName of tableNames) {
        const query = sql.raw(`DELETE FROM ${tableName}`);
        await db.run(query);
    }
    await db.run(sql.raw('PRAGMA foreign_keys=ON;'));

    console.log('Database cleared.');

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
            .values(gameMechanics.flavor())
            .returning();

        const skills = await tx
            .insert(schemas.skill)
            .values(gameMechanics.skill)
            .returning();

        const biomes = await tx
            .insert(schemas.biome)
            .values(gameMechanics.biome)
            .returning();

        // const biomeCoordResults: {
        //     biomeKey: string;
        //     xCoord: number;
        //     yCoord: number;
        // }[] = gameMechanics.biomeCoords.reduce(
        //     (
        //         arr: { biomeKey: string; xCoord: number; yCoord: number }[],
        //         curr,
        //     ) => {
        //         for (
        //             let x = 0;
        //             x < curr.bottomRight[0] - curr.topLeft[0];
        //             x++
        //         ) {
        //             for (
        //                 let y = 0;
        //                 y < curr.bottomRight[1] - curr.topLeft[1];
        //                 y++
        //             ) {
        //                 arr.push({
        //                     biomeKey: curr.biomeKey,
        //                     xCoord: x,
        //                     yCoord: y,
        //                 });
        //             }
        //         }
        //         return arr;
        //     },
        //     [],
        // );
        const biomeCoordResults = gameMechanics.biomeCoords.reduce(
            (
                arr: { biomeKey: string; xCoord: number; yCoord: number }[],
                curr: { topLeft: any[]; bottomRight: number[]; biomeKey: any },
            ) => {
                // Loop over x coordinates from topLeft[0] to bottomRight[0]
                for (let x = curr.topLeft[0]; x <= curr.bottomRight[0]; x++) {
                    // Loop over y coordinates from topLeft[1] to bottomRight[1]
                    for (
                        let y = curr.topLeft[1];
                        y <= curr.bottomRight[1];
                        y++
                    ) {
                        // Push each coordinate as an object into the array
                        arr.push({
                            biomeKey: curr.biomeKey,
                            xCoord: x,
                            yCoord: y,
                        });
                    }
                }
                return arr;
            },
            [], // Initialize the accumulator with the correct type
        );

        const biomeCoords = await tx
            .insert(schemas.biomeCoords)
            .values(biomeCoordResults)
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
