import { NextResponse } from 'next/server';

import { currentUser } from '@clerk/nextjs/server';
import { eq } from 'drizzle-orm';
import { db } from '@/db';
import { books } from '@/db/schema';

export async function PATCH(request, { params }) {
    const user = await currentUser();
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const {id}=await params
    const { completed } = await request.json();
    const updatedBook = await db
        .update(books)
        .set({ completed })
        .where(eq(books.id, parseInt(id)))
        .returning();

    return NextResponse.json(updatedBook[0]);
}

export async function DELETE(request, { params }) {
    const user = await currentUser();
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    const {id}=await params
    await db.delete(books).where(eq(books.id, parseInt(id)));
    return NextResponse.json({ success: true });
}