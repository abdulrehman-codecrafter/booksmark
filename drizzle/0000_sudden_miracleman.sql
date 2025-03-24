CREATE TABLE "books" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"title" text NOT NULL,
	"description" text,
	"completed" boolean DEFAULT false,
	"created_at" timestamp DEFAULT now()
);
