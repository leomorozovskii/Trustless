CREATE SCHEMA "otc";
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "otc"."colors" AS ENUM('red', 'green', 'blue');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "otc"."users" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text,
	"color" "otc"."colors" DEFAULT 'red'
);
