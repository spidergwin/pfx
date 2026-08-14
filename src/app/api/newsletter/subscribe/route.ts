import { NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Valid email address is required" }, { status: 400 });
    }

    const resendApiKey = process.env.RESEND_API_KEY;
    const audienceId = process.env.RESEND_AUDIENCE_ID;

    if (!resendApiKey) {
      console.warn("[NEWSLETTER] RESEND_API_KEY is not set in .env.");
      return NextResponse.json({
        success: true,
        message: "Simulated subscription (Add RESEND_API_KEY to send to Resend Audience).",
      });
    }

    if (!audienceId) {
      console.warn("[NEWSLETTER] RESEND_AUDIENCE_ID is not set in .env.");
      return NextResponse.json({
        success: true,
        message: "Simulated subscription (Add RESEND_AUDIENCE_ID to save to Resend Audience).",
      });
    }

    const resend = new Resend(resendApiKey);

    try {
      await resend.contacts.create({
        email,
        audienceId,
        unsubscribed: false,
      });
    } catch (resendErr: any) {
      console.warn("Resend Audience contact create notice:", resendErr?.message);
    }

    return NextResponse.json({ success: true, message: "Subscribed successfully to newsletter!" });
  } catch (error: any) {
    console.error("Newsletter subscribe error:", error);
    return NextResponse.json({ error: error.message || "Failed to subscribe" }, { status: 500 });
  }
}
