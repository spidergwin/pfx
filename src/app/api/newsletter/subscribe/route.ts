import { NextResponse } from "next/server";
import { Resend } from "resend";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const { email, source = "checkout" } = await request.json();

    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Valid email address is required" }, { status: 400 });
    }

    let resendContactId: string | undefined;

    // Add to Resend Audience if API key + Audience ID are set
    const resendApiKey = process.env.RESEND_API_KEY;
    const audienceId = process.env.RESEND_AUDIENCE_ID;

    if (resendApiKey && audienceId) {
      const resend = new Resend(resendApiKey);
      try {
        const contact = await resend.contacts.create({
          email,
          audienceId,
          unsubscribed: false,
        });
        resendContactId = (contact.data as any)?.id;
      } catch (resendErr: any) {
        // Subscriber may already exist in Resend — not a fatal error
        console.warn("Resend Audience add notice:", resendErr?.message);
      }
    } else {
      console.warn("[NEWSLETTER] RESEND_AUDIENCE_ID not set — subscriber will be stored in DB only.");
    }

    // Upsert subscriber in PostgreSQL
    try {
      await prisma.newsletterSubscriber.upsert({
        where: { email },
        update: { resendId: resendContactId },
        create: { email, resendId: resendContactId, source },
      });
    } catch (dbErr) {
      console.warn("DB newsletter upsert notice:", dbErr);
    }

    return NextResponse.json({ success: true, message: "Subscribed successfully!" });
  } catch (error: any) {
    console.error("Newsletter subscribe error:", error);
    return NextResponse.json({ error: error.message || "Failed to subscribe" }, { status: 500 });
  }
}
