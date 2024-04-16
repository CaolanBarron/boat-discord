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
('**"{0}"** {1} announces, to nobodies ears.'),;

DELETE FROM skills;

INSERT INTO skills (key, name)
VALUES
('FISH', 'Fishing'),
('SAIL', 'Sailing'),
('RESEARCH', 'Research'),
('CART', 'Cartography'),
('REPAIR', 'Repair');