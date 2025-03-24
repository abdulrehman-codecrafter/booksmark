import { pgTable, integer, varchar, boolean, unique } from "drizzle-orm/pg-core";

// Users table: using a serial for `id` and a unique Clerk ID
export const usersTable = pgTable(
  "users",
  {
    id: integer().primaryKey().generatedAlwaysAsIdentity(), // Serial primary key
    clerkId: varchar({ length: 255 }).notNull(), // Clerk ID from Clerk
    firstName: varchar({ length: 255 }),
    lastName: varchar({ length: 255 }),
    email: varchar({ length: 255 }).notNull().unique(),
    imgUrl: varchar({ length: 255 }),
  },
  (table) => ({
    // Explicit unique constraint on clerkId so it can be referenced
    clerkIdUnique: unique("users_clerk_id_unique").on(table.clerkId),
  })
);

// Books table: references usersTable.clerkId
export const booksTable = pgTable("books", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  userId: varchar({ length: 255 })
    .notNull()
    .references(() => usersTable.clerkId, { onDelete: "cascade" }),
  title: varchar({ length: 255 }).notNull(),
  description: varchar({ length: 500 }),
  completed: boolean().default(false),
});
