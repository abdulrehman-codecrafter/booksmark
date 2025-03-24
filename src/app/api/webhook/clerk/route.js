import { Webhook } from "svix";
import { headers } from "next/headers";
import { db } from "../../../../db/index";
import { usersTable } from "@/db/schema";
import { NextResponse } from "next/server";

export async function POST(req) {
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    return new NextResponse("Missing Clerk Webhook Secret", { status: 500 });
  }

  const headerPayload = headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new NextResponse("Missing Svix headers", { status: 400 });
  }

  const payload = await req.json();
  const body = JSON.stringify(payload);

  const wh = new Webhook(WEBHOOK_SECRET);
  let evt;

  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    });
  } catch (err) {
    console.error("Webhook verification failed:", err);
    return new NextResponse("Unauthorized", { status: 400 });
  }

  if (evt.type !== "user.created") {
    return new NextResponse("Ignored", { status: 200 });
  }

  const { id, email_addresses, first_name, last_name, image_url } = evt.data;

  if (!id || !email_addresses?.length) {
    return new NextResponse("Missing required user data", { status: 400 });
  }

  try {
    await db.insert(usersTable).values({
      // Use Clerk ID as the primary key (user id)
      id: id,
      email: email_addresses[0].email_address,
      firstName: first_name || null,
      lastName: last_name || null,
      imgUrl: image_url || null,
    });

    console.log(`User created with Clerk ID as primary key: ${id}`);
  } catch (err) {
    console.error("Database error:", err);
    return new NextResponse("Database sync error", { status: 500 });
  }

  return new NextResponse("User created successfully", { status: 200 });
}

export async function GET() {
  return new NextResponse("Method Not Allowed", { status: 405 });
}
