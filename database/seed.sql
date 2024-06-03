DELETE FROM tag;

INSERT INTO tag (key) 
VALUES
    ('FISHING'),
    ('SAILING'),
    ('RESEARCH'),
    ('CARTOGRAPHY'),
    ('REPAIR'),
    ('VOID'),
    ('SWAMP');

DELETE FROM flavor;

INSERT INTO flavor (content)
VALUES 
    ('**"{0}"** {1} says while scrubbing the deck relentlessly.'),
    ('**"{0}"** {1} mentions, as they stare into the horizon.'),
    ('**"{0}"** {1} says as they almost slip on the deck.'),
    ('**"{0}"** {1} comments, whilst peeling a suspiciously fresh orange.'),
    ('**"{0}"** {1} emits, fumbling for their lucky coin as it rolls along the deck.'),
    ('**"{0}"** {1} calls out from atop the boat, where they were attempting to adjust the receiver.'),
    ('**"{0}"** {1} grunts.'),
    ('**"{0}"** {1} states dismissively.'),
    ('**"{0}"** {1} slurs in between swigs of ale.'),
    ('**"{0}"** {1} says.'),
    ('**"{0}"** {1} shouts from somewhere deep in the boat.'),
    ('**"{0}"** {1} whispers, afraid of whats listening.'),
    ('**"{0}"** {1} answers cryptically.'),
    ('**"{0}"** {1} exclaims, jumping to their feet!'),
    ('**"{0}"** {1} comments, thinking about the land.'),
    ('**"{0}"** {1} announces, to the surprise of no one.');

INSERT INTO flavor (content, subject)
VALUES
('The wind blows in the wrong direction.', 'BOAT'),
('The Boat sways against the waves.', 'BOAT'),
('Something surfaces nearby... And then it doesn''t.', 'BOAT'),
('Wind howling...', 'BOAT'),
('The ocean looks darker today...', 'BOAT'),
('The Boat creaks in whispers.', 'BOAT'),
('Everyone on The Boat shudders.', 'BOAT'),
('God does not reply.', 'BOAT'),
('Nobody feels correct all of a sudden.', 'BOAT');

INSERT INTO flavor (content, tag, subject)
VALUES
('The brackish water bubbles', 'SWAMP', 'BOAT'),
('Something in the dark shifts...', 'VOID', 'BOAT');

DELETE FROM skill;

INSERT INTO skill (key, name)
VALUES
('FISH', 'Fishing'),
('SAIL', 'Sailing'),
('RESEARCH', 'Research'),
('CARTOGRAPHY', 'Cartography'),
('REPAIR', 'Repair');

DELETE FROM biome;

INSERT INTO biome (key, name, info)
VALUES
('SWAMP', 'Swamp', 'This is hidden information about the swamp biome'),
('VOID', 'Void', 'This is hidden information about the Void biome');

DELETE FROM biome_coords;

INSERT INTO biome_coords (biome_key, x_coord, y_coord)
VALUES
('SWAMP', 2, 2),
('SWAMP', 3, 2),
('SWAMP', 2, 3),
('SWAMP', 3, 3),
('VOID', -2, -2),
('VOID', -3, -2),
('VOID', -2, -3),
('VOID', -3, -3);

DELETE FROM item;

INSERT INTO item(key, name, description, info)
VALUES
('GAS_FISH', 'Gasotrout', 'This fish seems to have....gasoline inside it??', 'This is hidden information about the Gasotrout item.'),
('TROUT', 'Trout', 'Awww no gasoline...', 'This is hidden information about the Trout item.'),
('BOOT', 'Boot', 'I wouldnt wear that...', 'This is hidden information about the Boot item.'),
('SALMON', 'Salmon', 'Ahh the humble salmon.. salmondays amirite?', 'This is hidden information about the Salmon item.'),
('STURGEON', 'Sturgeon', 'This should not be here...', 'This is hidden information about the Sturgeon item.'),
('COMPASS', 'Compass', 'A guiding tool', 'This is hidden information about the Compass item.'),
('MUSIC_BOX', 'Music Box', 'Wow sounds good', 'This is hidden information about the Music Box item.'),
('LANTERN', 'Lantern', 'Something to light up the boat', 'This is hidden information about the Lantern item.'),
('HOURGLASS', 'Hourglass', 'Hows time doing?', 'This is hidden information about the Hourglass item.'),
('HARMONICA', 'Harmonica', 'hot hot hot', 'This is hidden information about the Harmonica item.'),
('LAVA_FISH', 'Lava fish', 'hot hot hot', 'This is hidden information about the Lava fish item.'),
('SALVAGE_FUEL', 'Salvage fuel', 'Allows operation of the salvage arm', 'This is hidden information about the Lava fish item.');

DELETE FROM item_transformation;

INSERT INTO item_transformation(original, transformation)
VALUES
('BOOT', 'COMPASS'),
('MUSIC_BOX', 'HARMONICA'),
('TROUT', 'GAS_FISH'),
('LANTERN', 'HOURGLASS'),
('LAVA_FISH', 'STURGEON');

DELETE FROM loot;

INSERT INTO loot(key, item_key, rarity)
VALUES
('FISH', 'GAS_FISH', 'COMMON'),
('FISH', 'TROUT', 'COMMON'),
('FISH', 'BOOT', 'COMMON'),
('FISH', 'SALMON', 'COMMON'),
('FISH', 'STURGEON', 'RARE'),
('FISH', 'LAVA_FISH', 'ODDITY');

DELETE FROM activities;

INSERT INTO activities(key, name, allow_during_sail)
VALUES
('FISH', 'Fish', false),
('CARTOGRAPHY', 'Cartography', false),
('REPAIR', 'Repair', false),
('RESEARCH', 'Research', false),
('NORTH_SAILING', 'North Sailing', true),
('SOUTH_SAILING', 'South Sailing', true),
('WEST_SAILING', 'West Sailing', true),
('EAST_SAILING', 'East Sailing', true);


DELETE FROM effect;

INSERT INTO effect (id, key, name, description, effect_type)
VALUES
(1, 'SPEED_INC', 'Speed Increase', 'The Boat is traveling faster than usual', 'BUFF'),
(2, 'SPEED_DEC', 'Speed Decrease', 'The Boat is traveling slower than usual', 'DEBUFF'),
(3, 'RESEARCH_IMP', 'Research Improved', 'The research activity will yield more results', 'BUFF'),
(4, 'RESEARCH_NEG', 'Research Negative', 'The research activity will yield less result', 'DEBUFF'),
(5, 'FATIGUE', 'Fatigue', 'You find yourself not able to do much', 'DEBUFF'),
(6, 'BLESSED', 'Blessed', 'All activities are more successful', 'BUFF'),
(7, 'CURSED', 'Cursed', 'All activities are less successful', 'DEBUFF');


DELETE FROM prompt_message;

INSERT INTO prompt_message
VALUES
(1, 'The engine has suddenly stopped working'),
(2, 'A mermaid has been sighted overboard'),
(3, 'A strange figure appears on the ship');

DELETE FROM prompt_action;

INSERT INTO prompt_action
VALUES
(1, 1, 'Attempt to fix it', 'REPAIR', 3),
(3, 1, 'Study the algae growing on it', 'RESEARCH', 6),
(4, 2, 'Take as many notes as you can', 'RESEARCH', 6);


INSERT INTO prompt_action(id, message_id, content)
VALUES
(2, 1, 'Ignore it and hope'),
(5, 2, 'Turn a blind eye to the creature'),
(6, 2, 'Reach out and help her'),
(7, 3, 'Step towards them'),
(8, 3, 'Find a spot and hide');

DELETE FROM prompt_outcome;

INSERT INTO prompt_outcome(action_id, content, outcome_type, effect_id)
VALUES
( 1, 'The boat is fixed! and improved...', 'SUCCESS', 1),
( 1, 'Well that could have gone better...', 'FAILURE', 2),
( 2, 'The engine only gets worse...', 'FAILURE', null),
( 3, 'Perhaps a the unique biological makeup of this strange algae could be used to enhance the engine...', 'SUCCESS', 1),
( 3, 'The algae grows thicker...', 'FAILURE', 2),
( 4, 'This information could prove invaluable...', 'SUCCESS', 3),
( 4, 'She doesnt like being looked at...', 'FAILURE', 4),
( 5, 'The privacy is respectful, When you turn around she is gone...', 'SUCCESS', null),
( 6, 'You do not belong in her world...', 'SUCCESS', 5),
( 7, 'A flash of light and a warm feeling... Some just need to be guided to a material place', 'SUCCESS', 6),
( 8, 'A dark shadow descends over The Boat... Ignoring problems is not always wise...', 'FAILURE', 7);


