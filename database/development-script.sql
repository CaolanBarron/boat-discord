PRAGMA foreign_keys = OFF;

DROP TABLE IF EXISTS player;

CREATE TABLE player(
  id INTEGER PRIMARY KEY,
  user_id TEXT,
  boat_id TEXT,
  name TEXT,

  FOREIGN KEY(boat_id) REFERENCES boat(id)
);


DROP TABLE IF EXISTS skill;

CREATE TABLE skill(
  key TEXT PRIMARY KEY,
  name TEXT
);


DROP TABLE IF EXISTS player_skills;

CREATE TABLE player_skills(
  player_id INTEGER,
  skill_key TEXT,
  xp INT,

  FOREIGN KEY(player_id) REFERENCES player(id),
  FOREIGN key(skill_key) REFERENCES skill(key)
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
  boat_id TEXT NOT NULL,
  item_key TEXT NOT NULL,
  collected_by INTEGER,
  locked_by INTEGER,

  FOREIGN KEY(boat_id) REFERENCES boat(id),
  FOREIGN KEY(item_key) REFERENCES item(key),
  FOREIGN KEY(collected_by) REFERENCES player(id),
  FOREIGN KEY(locked_by) REFERENCES player(id)
);

DROP TABLE IF EXISTS boat_travel_history;

CREATE TABLE boat_travel_history(
  id INTEGER PRIMARY KEY,
  boat_id INTEGER NOT NULL,
  x_coord INTEGER NOT NULL,
  y_coord INTEGER NOT NULL,
  biome TEXT,
  timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,

  FOREIGN KEY(boat_id) REFERENCES boat(id)
);

DROP TABLE IF EXISTS item_transformation;

DROP TABLE IF EXISTS loot;

DROP TABLE IF EXISTS item;

CREATE TABLE item(
  key TEXT PRIMARY KEY,
  name TEXT,
  description TEXT,
  info TEXT
);


CREATE TABLE loot(
  key TEXT,
  item_key TEXT,
  rarity TEXT,

  UNIQUE(key, item_key),

  FOREIGN KEY(item_key) REFERENCES item(key)
);


CREATE TABLE item_transformation(
  original TEXT,
  transformation TEXT,

  UNIQUE(original, transformation),

  FOREIGN KEY(original) REFERENCES item(key),
  FOREIGN KEY(transformation) REFERENCES item(key)

);

---

DROP TABLE IF EXISTS flavor;

DROP TABLE IF EXISTS tag;

CREATE TABLE tag(
  key TEXT PRIMARY KEY
);

CREATE TABLE flavor(
  key INTEGER PRIMARY KEY,
  content TEXT,
  tag TEXT,
  subject TEXT NOT NULL DEFAULT 'PLAYER',

  FOREIGN KEY(tag) REFERENCES tag(key)
);



DROP TABLE IF EXISTS active_tags;

CREATE TABLE active_tags(
  key TEXT NOT NULL,
  player_id INTEGER,
  boat BOOLEAN,

  FOREIGN KEY(player_id) REFERENCES player(id)
);

DROP TABLE IF EXISTS biome_coords;

DROP TABLE IF EXISTS biome;

CREATE TABLE biome(
  key TEXT PRIMARY KEY,
  name TEXT,
  info TEXT
);


CREATE TABLE biome_coords(
  biome_key TEXT,
  x_coord INTEGER,
  y_coord INTEGER,
  
  UNIQUE(x_coord, y_coord),

  FOREIGN KEY(biome_key) REFERENCES biome(key) 
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
);


DROP TABLE IF EXISTS effect;

CREATE TABLE effect (
  id INTEGER PRIMARY KEY,
  key TEXT NOT NULL,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  effect_type TEXT CHECK(effect_type IN ('BUFF', 'DEBUFF')) NOT NULL DEFAULT 'BUFF'
);

DROP TABLE IF EXISTS boat_effect;

CREATE TABLE boat_effect (
  boat_id TEXT,
  effect_id INTEGER,

  FOREIGN KEY(boat_id) REFERENCES boat(id),
  FOREIGN KEY(effect_id) REFERENCES effect(id)
);

--- PROMPTS

DROP TABLE IF EXISTS prompt_message;

CREATE TABLE prompt_message(
  id INTEGER PRIMARY KEY,
  content TEXT
);

DROP TABLE IF EXISTS prompt_action;

CREATE TABLE prompt_action(
  id INTEGER PRIMARY KEY,
  message_id INTEGER NOT NULL,
  content TEXT NOT NULL,
  challenge_skill TEXT,
  challenge_value INTEGER,

  FOREIGN KEY(message_id) REFERENCES prompt_message(id),
  FOREIGN KEY (challenge_skill) REFERENCES skill(key)
);

DROP TABLE IF EXISTS prompt_outcome;

CREATE TABLE prompt_outcome(
  id INTEGER PRIMARY KEY,
  action_id INTEGER,
  content TEXT NOT NULL,
  outcome_type TEXT CHECK(outcome_type IN ('SUCCESS', 'FAILURE')) NOT NULL DEFAULT 'SUCCESS',
  effect_id INTEGER,
 
  UNIQUE(action_id, outcome_type),

  FOREIGN KEY(action_id) REFERENCES prompt_action(id),
  FOREIGN KEY(effect_id) REFERENCES effect(id)
);

DROP TABLE IF EXISTS treasure;

CREATE TABLE treasure(
  boat_id TEXT NOT NULL, 
  item_key TEXT NOT NULL,
  x_coord INTEGER NOT NULL,
  y_coord INTEGER NOT NULL,

  UNIQUE(boat_id, x_coord, y_coord)

  FOREIGN KEY (boat_id) REFERENCES boat(id),
  FOREIGN KEY (item_key) REFERENCES item(key)
);

PRAGMA foreign_keys = ON;
