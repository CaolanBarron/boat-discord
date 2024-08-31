export const tag = [
    { key: 'FISHING' },
    { key: 'SAILING' },
    { key: 'RESEARCH' },
    { key: 'CARTOGRAPHY' },
    { key: 'REPAIR' },
    { key: 'STORM' },
    { key: 'VOID' },
    { key: 'SLUDGE' },
    { key: 'TROPICAL' },
    { key: 'ELECTRONIC' },
    { key: 'FLESH' },
    { key: 'MIRROR' },
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
        key: 'OPEN_OCEAN',
        name: 'Open Ocean',
        info: 'The world is now ocean as far as the eye can see.',
    },
    {
        key: 'STORM',
        name: 'Storm',
        info: 'The air in this region is thick with the smell of ozone, clouds are converging rapidly and the rain falls heavily.',
    },
    {
        key: 'VOID',
        name: 'Void',
        info: 'No matter the time of day this area is always dark, the air is cold and especially bottomless. Its more difficult to smile here.',
    },
    {
        key: 'SLUDGE',
        name: 'Sludge',
        info: 'The water in this region is thick and oily, the smell is overpowering and you wonder how the boat is capable of moving through this liquid.',
    },
    {
        key: 'TROPICAL',
        name: 'Tropical',
        info: 'The water is warm and clear, the sun is shining and the fish are plentiful. This is the best place to be on The Boat, although the sun does seem to be burning brighter and brighter...',
    },
    {
        key: 'ELECTRONIC',
        name: 'Electronic',
        info: 'This area has an unusual number of devices found floating in the water. Every now and then you come across poles jutting out filled with cables and circuitry.',
    },
    {
        key: 'FLESH',
        name: 'Flesh',
        info: 'The water in this region seems to have a tint of red, the smell is of iron and the fish are... different. The fish here are not fish, they are flesh, they are meat, they are muscle.',
    },
    {
        key: 'MIRROR',
        name: 'Mirror',
        info: 'The water in this region is perfectly still, the sky is reflected perfectly in the water. Staring into the water takes you further and further from reality into non euclidean insanity.',
    },
];

export const biomeCoords = [{ biomeKey: '', xCoord: 0, yCoord: 0 }];

export const item = [
    {
        key: 'GAS_TROUT',
        name: 'Gas trout',
        description: 'This fish seems to have gasoline in place of blood',
        info: 'It seems this fish can be found anywhere in the ocean',
    },
    {
        key: 'TROUT',
        name: 'Trout',
        description: 'Ok this one has actual blood',
        info: 'Trout can reach the ripe old age of 20 years',
    },
    {
        key: 'TRUMPETFISH',
        name: 'Trumpetfish',
        description: 'A strange long fish with a rectangular body',
        info: 'Not much is known about trumpetfish reproduction, they probably dance',
    },
    {
        key: 'BLUEBANDED_GOBY',
        name: 'Bluebanded Goby',
        description: 'An orange with striking blue stripes',
        info: 'The bluebanded goby is originally from the Indo-Pacific region',
    },
    {
        key: 'SALMON',
        name: 'Salmon',
        description: 'A silver fish which is a popular food source',
        info: 'The salmon swims upstream to spawn, there is no upstream anymore',
    },
    {
        key: 'ELECTRIC_EEL',
        name: 'Electric Eel',
        description:
            'A snakelike fish that can produce electricity to stun prey',
        info: 'The study of the electric eel has led to the invention of the battery, probably',
    },
    {
        key: 'BLUEHEADED_WRASSE',
        name: 'Blueheaded Wrasse',
        description: 'A multicolored fish with a blue head',
        info: 'This one knows how to party',
    },
    {
        key: 'SEADRAGON',
        name: 'Seadragon',
        description: 'A small fish with leaf-like appendages for camouflage',
        info: 'The seadragon is a close relative of the seahorse',
    },
    {
        key: 'SNIPE_EEL',
        name: 'Snipe Eel',
        description:
            'A long, thin fish with a pointed snout and no pelvic fins',
        info: 'This fish would be mostly tail if it weren’t for the head',
    },
    {
        key: 'FLASHLIGHT_FISH',
        name: 'Flashlight Fish',
        description: 'A fish with bioluminescent organs under its eyes',
        info: 'Keeping one of these in a jar could be useful',
    },
    {
        key: 'ANGLERFISH',
        name: 'Anglerfish',
        description: 'A fish with a bioluminescent lure on its head',
        info: 'Your studies find these fish are growing exponentially...',
    },
    {
        key: 'JOHN_DORY',
        name: 'John Dory',
        description: 'A flat, round fish with a black spot on its side',
        info: 'It is rumoured that the John Dory is the fish that swallowed Jonah',
    },
    {
        key: 'GRUNION',
        name: 'Grunion',
        description: 'A small fish that spawns on beaches at night',
        info: 'The grunion is a popular fish in California, you suddenly miss california deeply',
    },
    {
        key: 'LONG_SNOUTED_SEAHORSE',
        name: 'Long snouted seahorse',
        description:
            'A seahorse with a long snout, it looks like an actual horse ',
        info: 'The long snouted seahorse is a close relative of the seadragon',
    },
    {
        key: 'RED_SNAPPER',
        name: 'Red Snapper',
        description: 'A red fish that is popular in cooking',
        info: 'The red snapper is a popular fish in the Gulf of Mexico',
    },
    {
        key: 'DOLPHINFISH',
        name: 'Dolphinfish',
        description: 'A fish with a long dorsal fin and a blunt head',
        info: 'The dolphinfish is not a dolphin, it is a fish, which is different apparently',
    },
    {
        key: 'SAWFISH',
        name: 'Sawfish',
        description: 'A fish with a long, flat snout with teeth on the sides',
        info: 'THE SAWFISH IS NOT A SAW, DO NOT USE IT AS A SAW',
    },
    {
        key: 'QUEEN_ANGELFISH',
        name: 'Queen Angelfish',
        description: 'A colorful fish with a blue ring on its head',
        info: 'This fish whispers secrets when you aren’t looking',
    },
    {
        key: 'DREAMFISH',
        name: 'Dreamfish',
        description:
            'A fish that seems to be made of dreams, but is actually made out of fish',
        info: 'The dreamfish is a rare fish that is said to bring good luck',
    },
    {
        key: 'SARDINE',
        name: 'Sardine',
        description: 'A small fish that is often found in large schools',
        info: 'The sardine is a popular fish in the Mediterranean',
    },
    {
        key: 'OARFISH',
        name: 'Oarfish',
        description: 'A long, thin fish that looks like an oar',
        info: 'The oarfish is a deep sea fish that is rarely seen alive',
    },
    {
        key: 'PYGMY_SEAHORSE',
        name: 'Pygmy Seahorse',
        description: 'A tiny seahorse with a body that looks like coral',
        info: 'The pygmy seahorse is a master of disguise',
    },
    {
        key: 'MEXICAN_LOOKDOWN',
        name: 'Mexican Lookdown',
        description: 'A fish with a flat, silvery body and a downward mouth',
        info: 'THE MEXICAN LOOKDOWN IS NOT JUDGING YOU, IT IS JUST LOOKING DOWN',
    },
    {
        key: 'GUINEAFOWL_PUFFER',
        name: 'Guineafowl Puffer',
        description: 'A fish with black spots on its body',
        info: 'The guineafowl puffer is more dangerous than it looks',
    },
    {
        key: 'BONITO',
        name: 'Bonito',
        description: 'A fish that is related to the tuna',
        info: 'The bonito is the fastest fish in the ocean, except for the fish that are faster',
    },
    {
        key: 'TRUMPET',
        name: 'Trumpet',
        description:
            'A classic brass instrument now covered in barnacles and rust',
        info: 'When played it sounds like the ocean, but a different ocean than this one',
    },
    {
        key: 'LIGHTNING_BOTTLE',
        name: 'Lightning in a bottle',
        description:
            'A bottle filled with what seems to be lightning bouncing around the inside',
        info: 'The bottle seems to go through phases of activity apparently influenced by the weather',
    },
    {
        key: 'GOLD_COINS',
        name: 'Gold coins',
        description: 'A small pile of gold coins in a suspiciously dry pouch',
        info: 'Each coin is stamped with the face of a different king, none of whom you recognize, some lack common human features',
    },
    {
        key: 'SPYGLASS',
        name: 'Spyglass',
        description: 'A telescope with strange symbols etched into the side',
        info: 'Sometimes when you look through the spyglass you see land that isn’t there',
    },
    {
        key: 'PLAYING_CARDS',
        name: 'Deck of playing cards',
        description:
            'A deck of cards with with suits you are not familiar with such as soul',
        info: 'The cards seem to shuffle themselves when you aren’t looking, Does the configuration of the cards mean something?',
    },
    {
        key: 'DARKNESS_JAR',
        name: 'Darkness in a jar',
        description: 'A jar filled with darkness that seems to absorb light',
        info: 'When you open the jar the darkness spills out and fills the room, it is time consuming to scoop back up',
    },
    {
        key: 'CERULEAN_JADE',
        name: 'Cerulean Jade',
        description: 'A small piece of jade that is a deep blue color',
        info: 'The cerulean jade is said to bring good luck to sailors',
    },
    {
        key: 'IPOD',
        name: 'iPod',
        description: 'A small device that plays music from a different time',
        info: 'Most of these songs are undisputed classics, some are 20 minutes of screaming and incoherent uttering',
    },
    {
        key: 'SPEAKERS',
        name: 'Speakers',
        description:
            'A pair of speakers that can play audio at a high volume, useful with the iPod',
        info: 'They sometimes play music on their own, it is not always music',
    },
    {
        key: 'SKIN_INTERFACE',
        name: 'Skin interface',
        description:
            'A pill shaped object with tendrils coming off of it. These tendrils seem to integrate with any living flesh they come into contact with.',
        info: 'The longer this object is embedded with a living creature the more difficult it is to remove',
    },
    {
        key: 'SMOOTH_STONE',
        name: 'Oddly smooth stone',
        description: 'A stone that is perfectly smooth on all sides',
        info: 'Despite its complete smoothness the stone always stops at the same point when rolled',
    },
    {
        key: 'BONE_DAGGER',
        name: 'Bone dagger',
        description: 'A dagger made from seems to be whale bone',
        info: 'The dagger is sharper than it looks being capable of even cutting the metal on The Boat',
    },
    {
        key: 'DIAMOND_ENCRUSTED_DIAMOND',
        name: 'Diamond encrusted diamond',
        description:
            'A diamond with smaller diamonds purposefully embedded in it',
        info: 'You cannot confirm it but you suspect the placement of these diamonds ',
    },
    {
        key: 'VIRTUAL_REALITY_TUBE',
        name: 'Virtual reality tube',
        description:
            'A tube that goes around the users head and projects a lifelike virtual reality',
        info: 'The environment the user is put into seems dependant on their real world surroundings',
    },
    {
        key: 'STORY_SCALE',
        name: 'Story scale',
        description:
            'A piece of porcelain vibrates when a story is spoken near it',
        info: 'The story scale seems to be able to tell the difference between a true story and a lie',
    },
    {
        key: 'OBSIDIAN_SHARD',
        name: 'Obsidian shard',
        description: 'A shard of obsidian darker than the night',
        info: 'The obsidian shard seems to absorb light, it is difficult to look at for too long',
    },
    {
        key: 'SITCOM_VCR',
        name: '90s sitcom VCR',
        description: 'A VCR that plays a different show every time it is used',
        info: 'For one minute in one viewing, you and everyone else on The Boat appear in the show. Before one of you can say a line, the show ends',
    },
    {
        key: 'GLOWING_SCARAB',
        name: 'Glowing scarab',
        description: 'A beetle that glows with a soft light',
        info: 'The glowing scarab seems to be able to predict the weather, it is always wrong',
    },
    {
        key: 'SLUDGE_BLOOM',
        name: 'Sludge bloom',
        description: 'A beautiful flower that secretes a foul brown liquid',
        info: 'You decide not to taste the liquid...',
    },
    {
        key: 'AMBERGRIS',
        name: 'Ambergris',
        description:
            'A waxy substance that is produced in the intestines of sperm whales',
        info: 'One of you decide to taste the ambergris, they awaken three days later with a slightly different cadence to their speech',
    },
    {
        key: 'MEMORY_SHARD',
        name: 'Shard of memory',
        description:
            'A shard of glass that makes you remember things that did not happen',
        info: 'Prolonged use of the memory shard can cause real memories to be replaced',
    },
    {
        key: 'INWARD_SPECTACLES',
        name: 'Inward Spectacles',
        description: 'A pair of glasses that cause the wearer to hallucinate',
        info: 'The hallucinations seem to have a consistent pattern between users',
    },
    {
        key: 'MIRRORED_PUZZLE_BOX',
        name: 'Mirrored puzzle box',
        description:
            'A reflective puzzle box that you have not been able to solve yet',
        info: 'A slide and a click, you have come one step closer to solving the puzzle',
    },
    {
        key: 'BOOT',
        name: 'Boot',
        description: 'This is a boot',
        info: 'Size 10 UK',
    },
    {
        key: 'STICK',
        name: 'Stick',
        description: 'This is a stick',
        info: 'Size 10 US',
    },
    {
        key: 'BOTTLE_NOTE',
        name: 'Note in a bottle',
        description: 'A corked bottle with a note slid inside',
        info: 'The note is written in a language you do not recognize, it is signed with a symbol of an Octopus',
    },
    {
        key: 'WRENCH',
        name: 'Wrench',
        description: 'This wrench will help to repair the boat',
        info: 'Its a wrench',
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
        itemKey: 'WRENCH',
        useKey: 'REPAIR_ALL',
        variable: 1,
    },
    {
        itemKey: 'WRENCH',
        useKey: 'INC_XP_BOAT_ALL',
        variable: 1,
    },
];

export const itemTransformation = [{ original: '', transformation: '' }];

export const loot = [
    { key: 'FISH', biome: 'VOID' },
    { key: 'TREASURE', biome: 'VOID' },
];

export const lootItem = [
    { lootKey: 'FISH', itemKey: 'HARMONICA', rarity: 'COMMON' },
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
