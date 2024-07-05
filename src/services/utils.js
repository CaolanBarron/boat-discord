import db from '../../database/database.js';

export function chooseRandomRarity(rarities, skillModifier, effectModifier) {
    const effectModfierClean = effectModifier || 0;
    let randomValue = Math.floor(Math.random() * 101);
    if (skillModifier) randomValue -= skillModifier;
    if (effectModfierClean) randomValue += effectModfierClean;
    for (const rarity of Object.keys(rarities)) {
        if (randomValue <= rarities[rarity]) {
            return rarity;
        } else {
            randomValue -= rarities[rarity];
            if (skillModifier) randomValue -= skillModifier;
            if (effectModfierClean) randomValue += effectModfierClean;
        }
    }
}

//TODO: Move this
const rarityToEffectTranslation = {
    FISH: ['FISH_QUALITY'],
    TREASURE: ['TREASURE_QUALITY'],
    TRANSFORMATION: ['TRANSFORMATION_QUALITY'],
};
export function getRarityEffectModifer(boatId, rarityKey) {
    const effects = rarityToEffectTranslation[rarityKey];
    const stmt = db()
        .prepare(
            `
        SELECT * 
        FROM boat_effect be 
        JOIN effect e ON be.effect_id = e.id
        WHERE be.boat_id = ?
        AND e.key IN ${sqlPlaceholder(effects.length)}`
        )
        .all(boatId, effects);

    let modifier = 0;

    if (stmt.find((f) => f.type === 'BUFF')) modifier += -2;
    if (stmt.find((f) => f.type === 'DEBUFF')) modifier += 2;

    return modifier;
}

export function sqlPlaceholder(length) {
    return `(${Array[length].map(() => '?').join(',')})`;
}
