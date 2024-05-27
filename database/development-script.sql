DROP TABLE IF EXISTS player;

CREATE TABLE player(
  id INTEGER PRIMARY KEY,
  user_id TEXT,
  boat_id TEXT,
  name TEXT
);


DROP TABLE IF EXISTS skills;

CREATE TABLE skills(
  key TEXT PRIMARY KEY,
  name TEXT
);


DROP TABLE IF EXISTS player_skills;

CREATE TABLE player_skills(
  player_id INTEGER,
  skill_key TEXT,
  xp INT
);

---

DROP TABLE IF EXISTS boat;

CREATE TABLE boat(
  id TEXT PRIMARY KEY,
  condition INTEGER,
  speed INTEGER,
  x_coord INTEGER,
  y_coord INTEGER
);

DROP TABLE IF EXISTS boat_inventory;

CREATE TABLE boat_inventory(
  id INTEGER PRIMARY KEY,
  boat_id TEXT,
  item_key TEXT,
  collected_by INTEGER,
  locked_by INTEGER
);

DROP TABLE IF EXISTS item;

CREATE TABLE item(
  key TEXT PRIMARY KEY,
  name TEXT,
  description TEXT,
  info TEXT
);

DROP TABLE IF EXISTS loot;

CREATE TABLE loot(
  key TEXT,
  item_key TEXT,
  rarity TEXT,
  UNIQUE(key, item_key)
);

DROP TABLE IF EXISTS item_transformation;

CREATE TABLE item_transformation(
  original TEXT,
  transformation TEXT
);

---

DROP TABLE IF EXISTS flavor;

CREATE TABLE flavor(
  key INTEGER PRIMARY KEY,
  content TEXT,
  tag TEXT,
  subject TEXT NOT NULL DEFAULT 'PLAYER'
);

DROP TABLE IF EXISTS tag;

CREATE TABLE tag(
  key TEXT PRIMARY KEY
);

DROP TABLE IF EXISTS active_tags;

CREATE TABLE active_tags(
  key TEXT NOT NULL,
  player_relation INTEGER,
  boat BOOLEAN
);

DROP TABLE IF EXISTS biomes;

CREATE TABLE biomes(
  key TEXT PRIMARY KEY,
  name TEXT,
  info TEXT
);

DROP TABLE IF EXISTS biome_coords;

CREATE TABLE biome_coords(
  biome_key TEXT,
  x_coord INTEGER,
  y_coord INTEGER,
  UNIQUE(x_coord, y_coord)
);

DROP TABLE IF EXISTS feedback;

CREATE TABLE feedback(
  player_name TEXT,
  message TEXT
);

DROP TABLE IF EXISTS activities;

CREATE TABLE activities(
  key TEXT PRIMARY KEY,
  name TEXT,
  allow_during_sail BOOLEAN
)
