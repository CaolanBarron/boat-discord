CREATE TABLE `item_uses` (
	`item_key` text,
	`use_key` text,
	`variable` numeric,
	FOREIGN KEY (`item_key`) REFERENCES `item`(`key`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`use_key`) REFERENCES `use`(`key`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `use` (
	`key` text PRIMARY KEY NOT NULL,
	`name` text
);
--> statement-breakpoint
ALTER TABLE `item` ADD `consumable` integer DEFAULT false;--> statement-breakpoint
ALTER TABLE `item` ADD `use_description` text;