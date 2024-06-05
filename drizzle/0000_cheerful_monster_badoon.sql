
CREATE TABLE `player` (
	`id` integer PRIMARY KEY,
	`user_id` text,
	`boat_id` text,
	`name` text,
	FOREIGN KEY (`boat_id`) REFERENCES `boat`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `skill` (
	`key` text PRIMARY KEY,
	`name` text
);
--> statement-breakpoint
CREATE TABLE `player_skills` (
	`player_id` integer,
	`skill_key` text,
	`xp` integer,
	FOREIGN KEY (`skill_key`) REFERENCES `skill`(`key`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`player_id`) REFERENCES `player`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `boat` (
	`id` text PRIMARY KEY,
	`condition` integer,
	`speed` integer,
	`x_coord` integer,
	`y_coord` integer
);
--> statement-breakpoint
CREATE TABLE `boat_inventory` (
	`id` integer PRIMARY KEY,
	`boat_id` text NOT NULL,
	`item_key` text NOT NULL,
	`collected_by` integer,
	`locked_by` integer,
	FOREIGN KEY (`locked_by`) REFERENCES `player`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`collected_by`) REFERENCES `player`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`item_key`) REFERENCES `item`(`key`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`boat_id`) REFERENCES `boat`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `boat_travel_history` (
	`id` integer PRIMARY KEY,
	`boat_id` integer NOT NULL,
	`x_coord` integer NOT NULL,
	`y_coord` integer NOT NULL,
	`biome` text,
	`timestamp` numeric DEFAULT (CURRENT_TIMESTAMP),
	FOREIGN KEY (`boat_id`) REFERENCES `boat`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `item` (
	`key` text PRIMARY KEY,
	`name` text,
	`description` text,
	`info` text
);
--> statement-breakpoint
CREATE TABLE `loot` (
	`key` text,
	`item_key` text,
	`rarity` text,
	FOREIGN KEY (`item_key`) REFERENCES `item`(`key`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `item_transformation` (
	`original` text,
	`transformation` text,
	FOREIGN KEY (`transformation`) REFERENCES `item`(`key`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`original`) REFERENCES `item`(`key`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `tag` (
	`key` text PRIMARY KEY
);
--> statement-breakpoint
CREATE TABLE `flavor` (
	`key` integer PRIMARY KEY,
	`content` text,
	`tag` text,
	`subject` text DEFAULT 'PLAYER' NOT NULL,
	FOREIGN KEY (`tag`) REFERENCES `tag`(`key`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `active_tags` (
	`key` text NOT NULL,
	`player_id` integer,
	`boat` numeric,
	FOREIGN KEY (`player_id`) REFERENCES `player`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `biome` (
	`key` text PRIMARY KEY,
	`name` text,
	`info` text
);
--> statement-breakpoint
CREATE TABLE `biome_coords` (
	`biome_key` text,
	`x_coord` integer,
	`y_coord` integer,
	FOREIGN KEY (`biome_key`) REFERENCES `biome`(`key`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `feedback` (
	`player_name` text,
	`message` text
);
--> statement-breakpoint
CREATE TABLE `activities` (
	`key` text PRIMARY KEY,
	`name` text,
	`allow_during_sail` numeric
);
--> statement-breakpoint
CREATE TABLE `effect` (
	`id` integer PRIMARY KEY,
	`key` text NOT NULL,
	`name` text NOT NULL,
	`description` text NOT NULL,
	`effect_type` text DEFAULT 'BUFF' NOT NULL
);
--> statement-breakpoint
CREATE TABLE `boat_effect` (
	`boat_id` text,
	`effect_id` integer,
	FOREIGN KEY (`effect_id`) REFERENCES `effect`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`boat_id`) REFERENCES `boat`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `prompt_message` (
	`id` integer PRIMARY KEY,
	`content` text
);
--> statement-breakpoint
CREATE TABLE `prompt_action` (
	`id` integer PRIMARY KEY,
	`message_id` integer NOT NULL,
	`content` text NOT NULL,
	`challenge_skill` text,
	`challenge_value` integer,
	FOREIGN KEY (`challenge_skill`) REFERENCES `skill`(`key`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`message_id`) REFERENCES `prompt_message`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `prompt_outcome` (
	`id` integer PRIMARY KEY,
	`action_id` integer,
	`content` text NOT NULL,
	`outcome_type` text DEFAULT 'SUCCESS' NOT NULL,
	`effect_id` integer,
	FOREIGN KEY (`effect_id`) REFERENCES `effect`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`action_id`) REFERENCES `prompt_action`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `treasure` (
	`id` integer PRIMARY KEY,
	`boat_id` text NOT NULL,
	`item_key` text NOT NULL,
	`x_coord` integer NOT NULL,
	`y_coord` integer NOT NULL,
	FOREIGN KEY (`item_key`) REFERENCES `item`(`key`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`boat_id`) REFERENCES `boat`(`id`) ON UPDATE no action ON DELETE no action
);
