CREATE TABLE `quotes` (
	`id` text PRIMARY KEY NOT NULL,
	`quote_number` text NOT NULL,
	`public_token` text NOT NULL,
	`owner_email` text NOT NULL,
	`destination` text DEFAULT 'Dubai, UAE' NOT NULL,
	`data` text NOT NULL,
	`total` integer NOT NULL,
	`created_at` text NOT NULL,
	`updated_at` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `quotes_quote_number_unique` ON `quotes` (`quote_number`);--> statement-breakpoint
CREATE UNIQUE INDEX `quotes_public_token_unique` ON `quotes` (`public_token`);--> statement-breakpoint
CREATE INDEX `quotes_owner_created_idx` ON `quotes` (`owner_email`,`created_at`);--> statement-breakpoint
CREATE INDEX `quotes_public_token_idx` ON `quotes` (`public_token`);