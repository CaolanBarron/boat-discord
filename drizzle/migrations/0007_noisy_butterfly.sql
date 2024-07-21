CREATE TABLE `loot_dg_tmp`
(
    `key`   text PRIMARY KEY,
    `biome_key` text REFERENCES `biome`(`key`)
);
--> statement-breakpoint
DROP TABLE `loot`;
--> statement-breakpoint
ALTER table `loot_dg_tmp` RENAME TO `loot`;
--> statement-breakpoint
CREATE TABLE `loot_item` (
	`loot_key` text,
	`item_key` text,
	`rarity` text,
	FOREIGN KEY (`loot_key`) REFERENCES `loot`(`key`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`item_key`) REFERENCES `item`(`key`) ON UPDATE no action ON DELETE no action
);
