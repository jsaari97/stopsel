CREATE TABLE `contribution` (
	`id` text PRIMARY KEY NOT NULL,
	`prompt_version_id` integer NOT NULL,
	`dialect_area_id` integer NOT NULL,
	`guest_identity_id` text NOT NULL,
	`response_text` text NOT NULL,
	`submitted_at` integer DEFAULT (cast(unixepoch('subsecond') * 1000 as integer)) NOT NULL,
	`moderation_state` text DEFAULT 'pending' NOT NULL,
	`privacy_notice_version` text NOT NULL,
	`submission_terms_version` text NOT NULL,
	FOREIGN KEY (`prompt_version_id`) REFERENCES `prompt_version`(`id`) ON UPDATE no action ON DELETE restrict,
	FOREIGN KEY (`dialect_area_id`) REFERENCES `dialect_area`(`id`) ON UPDATE no action ON DELETE restrict,
	FOREIGN KEY (`guest_identity_id`) REFERENCES `guest_identity`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `contribution_guest_submitted_idx` ON `contribution` (`guest_identity_id`,`submitted_at`);--> statement-breakpoint
CREATE INDEX `contribution_prompt_state_idx` ON `contribution` (`prompt_version_id`,`moderation_state`);--> statement-breakpoint
CREATE INDEX `contribution_dialect_idx` ON `contribution` (`dialect_area_id`);--> statement-breakpoint
CREATE TABLE `daily_prompt` (
	`scheduled_date` text PRIMARY KEY NOT NULL,
	`prompt_version_id` integer NOT NULL,
	`source` text NOT NULL,
	`created_at` integer DEFAULT (cast(unixepoch('subsecond') * 1000 as integer)) NOT NULL,
	FOREIGN KEY (`prompt_version_id`) REFERENCES `prompt_version`(`id`) ON UPDATE no action ON DELETE restrict
);
--> statement-breakpoint
CREATE INDEX `daily_prompt_version_idx` ON `daily_prompt` (`prompt_version_id`);--> statement-breakpoint
CREATE TABLE `guest_identity` (
	`id` text PRIMARY KEY NOT NULL,
	`token_hash` text NOT NULL,
	`created_at` integer DEFAULT (cast(unixepoch('subsecond') * 1000 as integer)) NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `guest_identity_token_hash_unique` ON `guest_identity` (`token_hash`);--> statement-breakpoint
CREATE INDEX `guest_identity_created_idx` ON `guest_identity` (`created_at`);--> statement-breakpoint
CREATE TABLE `prompt` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`is_active` integer DEFAULT true NOT NULL,
	`created_at` integer DEFAULT (cast(unixepoch('subsecond') * 1000 as integer)) NOT NULL
);
--> statement-breakpoint
CREATE INDEX `prompt_active_idx` ON `prompt` (`is_active`);--> statement-breakpoint
CREATE TABLE `prompt_version` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`prompt_id` integer NOT NULL,
	`version` integer NOT NULL,
	`text` text NOT NULL,
	`created_at` integer DEFAULT (cast(unixepoch('subsecond') * 1000 as integer)) NOT NULL,
	FOREIGN KEY (`prompt_id`) REFERENCES `prompt`(`id`) ON UPDATE no action ON DELETE restrict
);
--> statement-breakpoint
CREATE UNIQUE INDEX `prompt_version_prompt_version_uidx` ON `prompt_version` (`prompt_id`,`version`);
--> statement-breakpoint
INSERT INTO `prompt` (`id`) VALUES (1), (2), (3), (4), (5);
--> statement-breakpoint
INSERT INTO `prompt_version` (`prompt_id`, `version`, `text`) VALUES
	(1, 1, 'Jag tänkte gå till affären efter jobbet.'),
	(2, 1, 'Det är ganska kallt i dag.'),
	(3, 1, 'Vi tar en kaffe senare.'),
	(4, 1, 'Ska vi åka hem?'),
	(5, 1, 'Jag vet inte var han är.');
