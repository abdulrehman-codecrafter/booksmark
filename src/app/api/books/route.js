import { NextResponse } from 'next/server';
import { currentUser } from '@clerk/nextjs/server';
import { eq } from 'drizzle-orm';
import { db } from '@/db';
import { books } from '@/db/schema';

export async function GET() {
  const user = await currentUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const userBooks = await db.select().from(books).where(eq(books.userId, user.id));
  return NextResponse.json(userBooks);
}

export async function POST(request) {
  const user = await currentUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { title, description } = await request.json();
  const newBook = await db.insert(books).values({
    userId: user.id,
    title,
    description,
  }).returning();

  return NextResponse.json(newBook[0]);
}