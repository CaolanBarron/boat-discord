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
  condition INT,
  speed INT,
  x_coord FLOAT,
  y_coord FLOAT
);

DROP TABLE IF EXISTS boat_inventory;

CREATE TABLE boat_inventory(
  boat_id TEXT,
  item_key TEXT,
  collected_by TEXT
);

DROP TABLE IF EXISTS item;

CREATE TABLE item(
  key TEXT PRIMARY KEY,
  name TEXT
);

---

DROP TABLE IF EXISTS flavor;

CREATE TABLE flavor(
  key INTEGER PRIMARY KEY,
  content TEXT,
  tag TEXT
);

DROP TABLE IF EXISTS tag;

CREATE TABLE tag(
  key TEXT PRIMARY KEY
);

DROP TABLE IF EXISTS active_tags;

CREATE TABLE active_tags(
  key TEXT,
  player_relation INTEGER,
  boat BOOLEAN
);

DROP TABLE IF EXISTS biomes;

CREATE TABLE biomes(
  key TEXT,
  name TEXT
);

DROP TABLE IF EXISTS biome_coords;

CREATE TABLE biome_coords(
  biome_key TEXT,
  x_coord INTEGER,
  y_coord INTEGER,
  UNIQUE(x_coord, y_coord)
);
