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
    {
        key: 'MAGIC_WRENCH',
        name: 'Magic Wrench',
        description: 'Fixes da whole boat',
        info: 'Fixes da whole boat',
        use: 'I fixed da whole boat',
    },
];

export const use = [
    {
        key: 'INC_XP_PLAYER_RANDOM',
        name: 'Increases a players XP in a random skill',
    },
    { key: 'INC_XP_PLAYER_ALL', name: 'Increases a players XP in all skills' },
    {
        key: 'INC_XP_BOAT_RANDOM',
        name: 'Increases the boats XP in a random skill',
    },
    { key: 'INC_XP_BOAT_ALL', name: 'Increases the boats XP in all skills' },
    { key: 'REPAIR_ONE', name: 'Repairs one random defect on the boat' },
    { key: 'REPAIR_ALL', name: 'Repairs all defects on the boat' },
    { key: 'INC_SPEED', name: 'Applies the Sail Time buff' },
];

export const itemUse = [
    {
        itemKey: 'MAGIC_WRENCH',
        useKey: 'REPAIR_ALL',
        variable: 1,
    },
    {
        itemKey: 'MAGIC_WRENCH',
        useKey: 'INC_XP_BOAT_ALL',
        variable: 1,
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
        key: 'FISH_QUALITY',
        name: 'Fish Quality Improved',
        description: 'Fish quality improved',
        type: 'BUFF',
        rarity: 'COMMON',
    },
    {
        id: 2,
        key: 'FISH_QUALITY',
        name: 'Fish Quality Impaired',
        description: 'Fish quality impaired',
        type: 'DEBUFF',
        rarity: 'COMMON',
    },
    {
        id: 3,
        key: 'TREASURE_QUALITY',
        name: 'Treasure Quality Improved',
        description: 'Treasure quality improved',
        type: 'BUFF',
        rarity: 'COMMON',
    },
    {
        id: 4,
        key: 'TREASURE_QUALITY',
        name: 'Treasure Quality Impaired',
        description: 'Treasure quality impaired',
        type: 'DEBUFF',
        rarity: 'COMMON',
    },
    {
        id: 5,
        key: 'TRANSFORMATION_QUALITY',
        name: 'Transformation Quality Improved',
        description: 'Transformation quality improved',
        type: 'BUFF',
        rarity: 'COMMON',
    },
    {
        id: 6,
        key: 'TRANSFORMATION_QUALITY',
        name: 'Transformation Quality Impaired',
        description: 'Transformation quality impaired',
        type: 'DEBUFF',
        rarity: 'COMMON',
    },
    {
        id: 7,
        key: 'FISH_TIME',
        name: 'Fish Time Quicker',
        description: 'Fish time quicker',
        type: 'BUFF',
        rarity: 'COMMON',
    },
    {
        id: 8,
        key: 'FISH_TIME',
        name: 'Fish Time Slower',
        description: 'Fish time slower',
        type: 'DEBUFF',
        rarity: 'COMMON',
    },
    {
        id: 9,
        key: 'CARTOGRAPHY_TIME',
        name: 'Cartography Time Quicker',
        description: 'Cartography time quicker',
        type: 'BUFF',
        rarity: 'COMMON',
    },
    {
        id: 10,
        key: 'CARTOGRAPHY_TIME',
        name: 'Cartography Time Slower',
        description: 'Cartography time slower',
        type: 'DEBUFF',
        rarity: 'COMMON',
    },
    {
        id: 11,
        key: 'REPAIR_TIME',
        name: 'Repair Time Quicker',
        description: 'Repair time quicker',
        type: 'BUFF',
        rarity: 'COMMON',
    },
    {
        id: 12,
        key: 'REPAIR_TIME',
        name: 'Repair Time Slower',
        description: 'Repair time slower',
        type: 'DEBUFF',
        rarity: 'COMMON',
    },
    {
        id: 13,
        key: 'RESEARCH_TIME',
        name: 'Research Time Quicker',
        description: 'Research time quicker',
        type: 'BUFF',
        rarity: 'COMMON',
    },
    {
        id: 14,
        key: 'RESEARCH_TIME',
        name: 'Research Time Slower',
        description: 'Research time slower',
        type: 'DEBUFF',
        rarity: 'COMMON',
    },
    {
        id: 15,
        key: 'SAIL_TIME',
        name: 'Sail Time Quicker',
        description: 'Sail time quicker',
        type: 'BUFF',
        rarity: 'COMMON',
    },
    {
        id: 16,
        key: 'SAIL_TIME',
        name: 'Sail Time Slower',
        description: 'Sail time slower',
        type: 'DEBUFF',
        rarity: 'COMMON',
    },
    {
        id: 17,
        key: 'FISH_XP',
        name: 'More XP for Fishing',
        description: 'More XP for fishing',
        type: 'BUFF',
        rarity: 'COMMON',
    },
    {
        id: 18,
        key: 'FISH_XP',
        name: 'Less XP for Fishing',
        description: 'Less XP for fishing',
        type: 'DEBUFF',
        rarity: 'COMMON',
    },
    {
        id: 19,
        key: 'CARTOGRAPHY_XP',
        name: 'More XP for Cartography',
        description: 'More XP for cartography',
        type: 'BUFF',
        rarity: 'COMMON',
    },
    {
        id: 20,
        key: 'CARTOGRAPHY_XP',
        name: 'Less XP for Cartography',
        description: 'Less XP for cartography',
        type: 'DEBUFF',
        rarity: 'COMMON',
    },
    {
        id: 21,
        key: 'REPAIR_XP',
        name: 'More XP for Repairing',
        description: 'More XP for repairing',
        type: 'BUFF',
        rarity: 'COMMON',
    },
    {
        id: 22,
        key: 'REPAIR_XP',
        name: 'Less XP for Repairing',
        description: 'Less XP for repairing',
        type: 'DEBUFF',
        rarity: 'COMMON',
    },
    {
        id: 23,
        key: 'RESEARCH_XP',
        name: 'More XP for Researching',
        description: 'More XP for researching',
        type: 'BUFF',
        rarity: 'COMMON',
    },
    {
        id: 24,
        key: 'RESEARCH_XP',
        name: 'Less XP for Researching',
        description: 'Less XP for researching',
        type: 'DEBUFF',
        rarity: 'COMMON',
    },
    {
        id: 25,
        key: 'SAIL_XP',
        name: 'More XP for Sailing',
        description: 'More XP for sailing',
        type: 'BUFF',
        rarity: 'COMMON',
    },
    {
        id: 26,
        key: 'SAIL_XP',
        name: 'Less XP for Sailing',
        description: 'Less XP for sailing',
        type: 'DEBUFF',
        rarity: 'COMMON',
    },
];
