import { NextResponse } from "next/server";
import { initializePaystackTransaction } from "@/lib/paystack";
import { PFX_COURSE } from "@/lib/data";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "A valid email address is required" }, { status: 400 });
    }

    const course = PFX_COURSE;
    const amount = course.price; // $40.00
    const reference = `pfx_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;

    // Always use the configured app URL, never the spoofable Origin header
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
    const callback_url = `${appUrl}/courses/${course.slug}/confirmation`;

    // Save pending order to DB (includes customerEmail for later retrieval on verify)
    try {
      let user = await prisma.user.findUnique({ where: { email } });
      if (!user) {
        user = await prisma.user.create({
          data: { email, name: email.split("@")[0] },
        });
      }

      let dbCourse = await prisma.course.findUnique({ where: { slug: course.slug } });
      if (!dbCourse) {
        dbCourse = await prisma.course.create({
          data: {
            id: course.id,
            slug: course.slug,
            title: course.title,
            description: course.description,
            price: course.price,
            originalPrice: course.originalPrice,
            rating: course.rating,
            enrolledCount: course.enrolledCount,
            durationHours: course.durationHours,
            totalChapters: course.totalChapters,
            totalQuizzes: course.totalQuizzes,
            skillsGained: course.skillsGained,
          },
        });
      }

      await prisma.order.create({
        data: {
          reference,
          userId: user.id,
          courseId: dbCourse.id,
          customerEmail: email, // ← stored so verify can retrieve it post-redirect
          amount,
          status: "PENDING",
          paymentMethod: "paystack",
        },
      });
    } catch (dbErr) {
      console.warn("DB notice during order creation (non-fatal):", dbErr);
    }

    // Initialize Paystack transaction
    const paystackRes = await initializePaystackTransaction({
      email,
      amount,
      currency: "USD",
      reference,
      callback_url,
      metadata: {
        courseId: course.id,
        courseSlug: course.slug,
        courseTitle: course.title,
      },
    });

    if (!paystackRes.status || !paystackRes.data) {
      return NextResponse.json(
        { error: paystackRes.message || "Failed to initialize Paystack checkout. Ensure PAYSTACK_SECRET_KEY is set in .env" },
        { status: 400 }
      );
    }

    return NextResponse.json({
      authorization_url: (paystackRes.data as any).authorization_url,
      reference,
    });
  } catch (error: any) {
    console.error("Payment initialization error:", error);
    return NextResponse.json({ error: error.message || "Server error" }, { status: 500 });
  }
}
