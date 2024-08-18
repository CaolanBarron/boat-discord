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

export function sqlPlaceholder(length) {
    return `(${Array(length).fill('?').join(',')})`;
}
