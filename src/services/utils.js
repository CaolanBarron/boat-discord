export default function chooseRandomRarity(rarities) {
    let randomValue = Math.floor(Math.random() * 101);
    for (const rarity of Object.keys(rarities)) {
        if (randomValue <= rarities[rarity]) {
            return rarity;
        } else {
            randomValue -= rarities[rarity];
        }
    }
}
