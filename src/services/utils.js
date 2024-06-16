export default function chooseRandomRarity(rarities, skillModifier) {
    let randomValue = Math.floor(Math.random() * 101);
    if (skillModifier) randomValue -= skillModifier;
    for (const rarity of Object.keys(rarities)) {
        if (randomValue <= rarities[rarity]) {
            return rarity;
        } else {
            randomValue -= rarities[rarity];
            if (skillModifier) randomValue -= skillModifier;
        }
    }
}
