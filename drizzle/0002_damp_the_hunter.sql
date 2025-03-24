CREATE TABLE "books" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "books_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"userId" varchar(255) NOT NULL,
	"title" varchar(255) NOT NULL,
	"description" varchar(500),
	"completed" boolean DEFAULT false
);
--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "clerkId" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "books" ADD CONSTRAINT "books_userId_users_clerkId_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("clerkId") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_clerkId_unique" UNIQUE("clerkId");