DROP TABLE IF EXISTS player;

CREATE TABLE player(
  id TEXT PRIMARY KEY,
  name TEXT
);


DROP TABLE IF EXISTS skills;

CREATE TABLE skills(
  key TEXT PRIMARY KEY,
  name TEXT
);


DROP TABLE IF EXISTS player_skills;

CREATE TABLE player_skills(
  player_id TEXT,
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
  key TEXT PRIMARY KEY,
  content TEXT
);

DROP TABLE IF EXISTS flavor_tags;

CREATE TABLE flavor_tags(
  flavor_id TEXT,
  tag_key TEXT
);

DROP TABLE IF EXISTS tag;

CREATE TABLE tag(
  key TEXT PRIMARY KEY
);
