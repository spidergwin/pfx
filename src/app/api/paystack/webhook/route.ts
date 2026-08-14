import { NextResponse } from "next/server";
import crypto from "crypto";
import { sendCourseAccessEmail } from "@/lib/email";
import { PFX_COURSE } from "@/lib/data";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const secretKey = process.env.PAYSTACK_SECRET_KEY;
    if (!secretKey) {
      return NextResponse.json({ error: "PAYSTACK_SECRET_KEY missing" }, { status: 400 });
    }

    const bodyText = await request.text();
    const signature = request.headers.get("x-paystack-signature");

    // Verify Paystack HMAC SHA512 Signature
    const hash = crypto
      .createHmac("sha512", secretKey)
      .update(bodyText)
      .digest("hex");

    if (hash !== signature) {
      return NextResponse.json({ error: "Invalid Paystack signature" }, { status: 401 });
    }

    const eventData = JSON.parse(bodyText);

    if (eventData.event === "charge.success") {
      const data = eventData.data;
      const reference = data.reference;
      const customerEmail = data.customer?.email;
      const amountPaid = (data.amount || 4000) / 100;

      // Update Order Status in DB if configured
      try {
        await prisma.order.update({
          where: { reference },
          data: { status: "SUCCESS" },
        });
      } catch (dbErr) {
        console.warn("Webhook DB update notice:", dbErr);
      }

      // Dispatch Resend Email Delivery
      if (customerEmail) {
        await sendCourseAccessEmail({
          toEmail: customerEmail,
          courseTitle: PFX_COURSE.title,
          amountPaid,
          reference,
        });
      }
    }

    return NextResponse.json({ received: true });
  } catch (error: any) {
    console.error("Paystack Webhook Error:", error);
    return NextResponse.json({ error: error.message || "Webhook error" }, { status: 500 });
  }
}
