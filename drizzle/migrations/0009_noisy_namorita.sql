CREATE TABLE `loot_item_temp` (
    id integer PRIMARY KEY NOT NULL,
    loot_id integer
        references loot(id),
    item_key text
        references item(key),
    rarity text
    );--> statement-breakpoint
DROP TABLE loot_item;--> statement-breakpoint
ALTER TABLE loot_item_temp RENAME TO loot_item;--> statement-breakpoint

create table loot_temp (
    id integer PRIMARY KEY NOT NULL, 
    key text NOT NULL,
    biome_key text
        references biome
    );--> statement-breakpoint
INSERT INTO loot_temp (key, biome_key) SELECT key, biome_key FROM loot;--> statement-breakpoint
DROP TABLE loot;--> statement-breakpoint
ALTER TABLE loot_temp RENAME TO loot;
