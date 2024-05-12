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
    ('**"{0}"** {1} slurrs in between swigs of ale.'),
    ('**"{0}"** {1} says.'),
    ('**"{0}"** {1} shouts from somewhere deep in the boat.'),
    ('**"{0}"** {1} whispers, afraid of whats listening.'),
    ('**"{0}"** {1} answers cryptically.'),
    ('**"{0}"** {1} exclaims, jumping to their feet!'),
    ('**"{0}"** {1} comments, thinking about the land.'),
    ('**"{0}"** {1} announces, to the suprise of no one.');

DELETE FROM tag;

INSERT INTO tag (key) 
VALUES
    ('FISHING'),
    ('SAILING'),
    ('RESEARCH'),
    ('CARTOGRAPHY'),
    ('REPAIR');

DELETE FROM skills;

INSERT INTO skills (key, name)
VALUES
('FISH', 'Fishing'),
('SAIL', 'Sailing'),
('RESEARCH', 'Research'),
('CARTOGRAPHY', 'Cartography'),
('REPAIR', 'Repair');

DELETE FROM biomes;

INSERT INTO biomes (key, Name)
VALUES
('SWAMP', 'Swamp'),
('VOID', 'Void');

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

INSERT INTO item(key, name, description)
VALUES
('GAS_FISH', 'Gasotrout', 'This fish seems to have....gasoline inside it??'),
('TROUT', 'Trout', 'Awww no gasoline...'),
('BOOT', 'Boot', 'I wouldnt wear that...'),
('SALMON', 'Salmon', 'Ahh the humble salmon.. salmondays amirite?'),
('STURGEON', 'Sturgeon', 'This should not be here...'),
('LAVA_FISH', 'Lava fish', 'hot hot hot');

DELETE FROM loot;

INSERT INTO loot(key, item_key, rarity)
VALUES
('FISH', 'GAS_FISH', 'COMMON'),
('FISH', 'TROUT', 'COMMON'),
('FISH', 'BOOT', 'COMMON'),
('FISH', 'SALMON', 'COMMON'),
('FISH', 'STURGEON', 'RARE'),
('FISH', 'LAVA_FISH', 'ODDITY');

DELETE FROM boat;

INSERT INTO boat(id, condition, speed, x_coord, y_coord)
VALUES
(1, 10, 5, 5, 5),
(2, 2, 2, 2, 9);

DELETE FROM player;

INSERT INTO player(id, user_id, boat_id, name)
VALUES
(1, 1, 1, 'John B1'),
(2, 2, 2, 'Martin B2'),
(3, 3, 1, 'Tim B1');


DELETE FROM player_skills;

INSERT INTO player_skills(player_id, skill_key, xp)
VALUES
(1, 'FISH', 0),
(1, 'SAIL', 0),
(1, 'RESEARCH', 0),
(1, 'CARTOGRAPHY', 0),
(1, 'REPAIR', 0),
(2, 'FISH', 0),
(2, 'SAIL', 0),
(2, 'RESEARCH', 0),
(2, 'CARTOGRAPHY', 0),
(2, 'REPAIR', 0);

DELETE FROM active_tags;