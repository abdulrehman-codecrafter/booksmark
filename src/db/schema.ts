import { pgTable, serial, text, boolean, timestamp } from 'drizzle-orm/pg-core';

export const books = pgTable('books', {
  id: serial('id').primaryKey(),
  userId: text('user_id').notNull(),
  title: text('title').notNull(),
  description: text('description'),
  completed: boolean('completed').default(false),
  createdAt: timestamp('created_at').defaultNow(),
});