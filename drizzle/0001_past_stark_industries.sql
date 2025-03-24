ALTER TABLE "users" ADD COLUMN "clerkId" varchar(255);--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "firstName" varchar(255);--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "lastName" varchar(255);--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "imgUrl" varchar(255);--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN "name";--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN "age";