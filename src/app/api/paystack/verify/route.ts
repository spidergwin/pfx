import { NextResponse } from "next/server";
import { verifyPaystackTransaction } from "@/lib/paystack";
import { prisma } from "@/lib/prisma";

// NOTE: Email delivery is handled exclusively by the Paystack webhook (POST /api/paystack/webhook).
// This route only verifies payment status and returns data to the confirmation UI.
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const reference = searchParams.get("reference");

    if (!reference) {
      return NextResponse.json({ error: "Reference query param is required" }, { status: 400 });
    }

    const verification = await verifyPaystackTransaction(reference);

    if (verification.status && (verification.data as any)?.status === "success") {
      const paystackEmail = (verification.data as any).customer?.email;
      const amountPaid = ((verification.data as any).amount || 4000) / 100;

      // Retrieve customerEmail stored at order creation (survives the Paystack redirect)
      let customerEmail = paystackEmail;
      try {
        const order = await prisma.order.findUnique({ where: { reference } });
        if (order) {
          customerEmail = order.customerEmail || paystackEmail;
          // Update order status if not already done by webhook
          if (order.status !== "SUCCESS") {
            await prisma.order.update({
              where: { reference },
              data: { status: "SUCCESS" },
            });
          }
        }
      } catch (dbErr) {
        console.warn("DB notice during verification:", dbErr);
      }

      return NextResponse.json({
        success: true,
        verified: true,
        reference,
        customerEmail,
        amountPaid,
      });
    }

    return NextResponse.json({
      success: false,
      verified: false,
      message: (verification as any).message || "Payment not confirmed yet.",
    });
  } catch (error: any) {
    console.error("Verification error:", error);
    return NextResponse.json({ error: error.message || "Server error" }, { status: 500 });
  }
}
