export const tag = [
    { key: 'FISHING' },
    { key: 'SAILING' },
    { key: 'RESEARCH' },
    { key: 'CARTOGRAPHY' },
    { key: 'REPAIR' },
    { key: 'VOID' },
    { key: 'SWAMP' },
];

export const flavor = [
    {
        content: '**"{0}"** {1} says while scrubbing the deck relentlessly.',
        tag: null,
    },
    {
        content: '**"{0}"** {1} mentions, as they stare into the horizon.',
        tag: null,
    },
    {
        content: '**"{0}"** {1} says as they almost slip on the deck.',
        tag: null,
    },
    {
        content:
            '**"{0}"** {1} comments, whilst peeling a suspiciously fresh orange.',
        tag: null,
    },
    {
        content:
            '**"{0}"** {1} emits, fumbling for their lucky coin as it rolls along the deck.',
        tag: null,
    },
    {
        content:
            '**"{0}"** {1} calls out from atop the boat, where they were attempting to adjust the receiver.',
        tag: null,
    },
    { content: '**"{0}"** {1} grunts.', tag: null },
    { content: '**"{0}"** {1} states dismissively.', tag: null },
    {
        content: '**"{0}"** {1} slurs in between swigs of ale.',
        tag: null,
    },
    { content: '**"{0}"** {1} says.', tag: null },
    {
        content: '**"{0}"** {1} shouts from somewhere deep in the boat.',
        tag: null,
    },
    {
        content: '**"{0}"** {1} whispers, afraid of whats listening.',
        tag: null,
    },
    { content: '**"{0}"** {1} answers cryptically.', tag: null },
    {
        content: '**"{0}"** {1} exclaims, jumping to their feet!',
        tag: null,
    },
    {
        content: '**"{0}"** {1} comments, thinking about the land.',
        tag: null,
    },
    {
        content: '**"{0}"** {1} announces, to the surprise of no one.',
        tag: null,
    },
    {
        content: 'The wind blows in the wrong direction.',
        tag: null,
        subject: 'BOAT',
    },
    {
        content: 'The Boat sways against the waves.',
        tag: null,
        subject: 'BOAT',
    },
    {
        content: `Something surfaces nearby... And then it doesn't.`,
        tag: null,
        subject: 'BOAT',
    },
    { content: 'Wind howling...', tag: null, subject: 'BOAT' },
    { content: 'The ocean looks darker today...', tag: null, subject: 'BOAT' },
    { content: 'The Boat creaks in whispers.', tag: null, subject: 'BOAT' },
    { content: 'Everyone on The Boat shudders.', tag: null, subject: 'BOAT' },
    { content: 'God does not reply.', tag: null, subject: 'BOAT' },
    {
        content: 'Nobody feels correct all of a sudden.',
        tag: null,
        subject: 'BOAT',
    },
    { content: 'The brackish water bubbles', tag: 'SWAMP', subject: 'BOAT' },
    {
        content: 'Something in the dark shifts...',
        tag: 'VOID',
        subject: 'BOAT',
    },
];

export const skill = [
    { key: 'FISH', name: 'Fish' },
    { key: 'SAIL', name: 'Sailing' },
    { key: 'RESEARCH', name: 'Research' },
    { key: 'CARTOGRAPHY', name: 'Cartography' },
    { key: 'REPAIR', name: 'Repair' },
];

export const biome = [
    {
        key: 'SWAMP',
        name: 'Swamp',
        info: 'This is hidden information about the swamp biome',
    },
    {
        key: 'VOID',
        name: 'Void',
        info: 'This is hidden information about the void biome',
    },
];

export const biomeCoords = [
    { biomeKey: 'SWAMP', xCoord: 2, yCoord: 2 },
    { biomeKey: 'SWAMP', xCoord: 3, yCoord: 2 },
    { biomeKey: 'SWAMP', xCoord: 2, yCoord: 3 },
    { biomeKey: 'SWAMP', xCoord: 3, yCoord: 3 },
    { biomeKey: 'VOID', xCoord: -2, yCoord: -2 },
    { biomeKey: 'VOID', xCoord: -3, yCoord: -2 },
    { biomeKey: 'VOID', xCoord: -2, yCoord: -3 },
    { biomeKey: 'VOID', xCoord: -3, yCoord: -3 },
];

export const item = [
    {
        key: 'GAS_FISH',
        name: 'Gasotrout',
        description: 'This fish seems to have....gasoline inside it??',
        info: 'This is hidden information about the Gasotrout item.',
    },
    {
        key: 'TROUT',
        name: 'Trout',
        description: 'Awww no gasoline...',
        info: 'This is hidden information about the Trout item.',
    },
    {
        key: 'BOOT',
        name: 'Boot',
        description: `I wouldn't wear that...`,
        info: 'This is hidden information about the Boot item.',
    },
    {
        key: 'SALMON',
        name: 'Salmon',
        description: 'Ahh the humble salmon.. salmondays amirite?',
        info: 'This is hidden information about the Salmon item.',
    },
    {
        key: 'STURGEON',
        name: 'Sturgeon',
        description: 'This should not be here...',
        info: 'This is hidden information about the Sturgeon item.',
    },
    {
        key: 'COMPASS',
        name: 'Compass',
        description: 'A guiding tool',
        info: 'This is hidden information about the Compass item.',
    },
    {
        key: 'MUSIC_BOX',
        name: 'Music Box',
        description: 'Wow sounds good',
        info: 'This is hidden information about the Music Box item.',
    },
    {
        key: 'LANTERN',
        name: 'Lantern',
        description: 'Something to light up the boat',
        info: 'This is hidden information about the Lantern item.',
    },
    {
        key: 'HOURGLASS',
        name: 'Hourglass',
        description: 'Hows time doing?',
        info: 'This is hidden information about the Hourglass item.',
    },
    {
        key: 'HARMONICA',
        name: 'Harmonica',
        description: 'hot hot hot',
        info: 'This is hidden information about the Harmonica item.',
    },
    {
        key: 'LAVA_FISH',
        name: 'Lava fish',
        description: 'hot hot hot',
        info: 'This is hidden information about the Lava fish item.',
    },
    {
        key: 'WINCH',
        name: 'Winch',
        description: 'Allows operation of the salvage arm',
        info: 'The water of the ocean is not caustic, yet when the salvage arm rises each time the rope is destroyed...',
    },
];

export const itemTransformation = [
    { original: 'BOOT', transformation: 'COMPASS' },
    { original: 'MUSIC_BOX', transformation: 'HARMONICA' },
    { original: 'TROUT', transformation: 'GAS_FISH' },
    { original: 'LANTERN', transformation: 'HOURGLASS' },
    { original: 'LAVA_FISH', transformation: 'STURGEON' },
];

export const loot = [
    { key: 'FISH', itemKey: 'GAS_FISH', rarity: 'COMMON' },
    { key: 'FISH', itemKey: 'TROUT', rarity: 'COMMON' },
    { key: 'FISH', itemKey: 'BOOT', rarity: 'COMMON' },
    { key: 'FISH', itemKey: 'SALMON', rarity: 'COMMON' },
    { key: 'FISH', itemKey: 'STURGEON', rarity: 'RARE' },
    { key: 'FISH', itemKey: 'LAVA_FISH', rarity: 'ODDITY' },
    { key: 'TREASURE', itemKey: 'WINCH', rarity: 'ODDITY' },
    { key: 'TREASURE', itemKey: 'HARMONICA', rarity: 'ODDITY' },
    { key: 'TREASURE', itemKey: 'HOURGLASS', rarity: 'ODDITY' },
    { key: 'TREASURE', itemKey: 'LANTERN', rarity: 'ODDITY' },
    { key: 'TREASURE', itemKey: 'MUSIC_BOX', rarity: 'ODDITY' },
];

export const activities = [
    { key: 'FISH', name: 'Fish', allowDuringSail: '0' },
    { key: 'CARTOGRAPHY', name: 'Cartography', allowDuringSail: '0' },
    { key: 'REPAIR', name: 'Repair', allowDuringSail: '0' },
    { key: 'RESEARCH', name: 'Research', allowDuringSail: '0' },
    { key: 'NORTH_SAILING', name: 'North Sailing', allowDuringSail: '1' },
    { key: 'SOUTH_SAILING', name: 'South Sailing', allowDuringSail: '1' },
    { key: 'WEST_SAILING', name: 'West Sailing', allowDuringSail: '1' },
    { key: 'EAST_SAILING', name: 'East Sailing', allowDuringSail: '1' },
];

export const effect = [
    {
        id: 1,
        key: 'SPEED_INC',
        name: 'Speed Increase',
        description: 'The Boat is traveling faster than usual',
        effectType: 'BUFF',
    },
    {
        id: 2,
        key: 'SPEED_DEC',
        name: 'Speed Decrease',
        description: 'The Boat is traveling slower than usual',
        effectType: 'DEBUFF',
    },
    {
        id: 3,
        key: 'RESEARCH_IMP',
        name: 'Research Improved',
        description: 'The research activity will yield more results',
        effectType: 'BUFF',
    },
    {
        id: 4,
        key: 'RESEARCH_NEG',
        name: 'Research Negative',
        description: 'The research activity will yield less result',
        effectType: 'DEBUFF',
    },
    {
        id: 5,
        key: 'FATIGUE',
        name: 'Fatigue',
        description: 'You find yourself not able to do much',
        effectType: 'DEBUFF',
    },
    {
        id: 6,
        key: 'BLESSED',
        name: 'Blessed',
        description: 'All activities are more successful',
        effectType: 'BUFF',
    },
    {
        id: 7,
        key: 'CURSED',
        name: 'Cursed',
        description: 'All activities are less successful',
        effectType: 'DEBUFF',
    },
];
