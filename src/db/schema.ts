import { pgTable, varchar, boolean, integer } from "drizzle-orm/pg-core";

// Users table: Using the Clerk ID as the primary key
export const usersTable = pgTable("users", {
  id: varchar({ length: 255 }).primaryKey(), // Clerk ID used as primary key
  email: varchar({ length: 255 }).notNull().unique(),
  firstName: varchar({ length: 255 }),
  lastName: varchar({ length: 255 }),
  imgUrl: varchar({ length: 255 }),
});

// Books table: References the user's Clerk ID stored in the "usersTable"
export const booksTable = pgTable("books", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  userId: varchar({ length: 255 })
    .notNull()
    .references(() => usersTable.id, { onDelete: "cascade" }),
  title: varchar({ length: 255 }).notNull(),
  description: varchar({ length: 500 }),
  completed: boolean().default(false),
});
