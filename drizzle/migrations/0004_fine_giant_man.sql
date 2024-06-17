ALTER TABLE `effect` RENAME COLUMN `effect_type` TO `type`;--> statement-breakpoint
DROP INDEX IF EXISTS `effect_key_effect_type_unique`;--> statement-breakpoint
CREATE UNIQUE INDEX `effect_key_type_unique` ON `effect` (`key`,`type`);