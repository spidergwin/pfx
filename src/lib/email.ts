import { Resend } from "resend";

export interface SendCourseAccessEmailParams {
  toEmail: string;
  courseTitle: string;
  amountPaid: number;
  reference: string;
  courseLink?: string;
}

export async function sendCourseAccessEmail(params: SendCourseAccessEmailParams) {
  const apiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.RESEND_FROM_EMAIL;

  if (!apiKey) {
    console.warn("[EMAIL] RESEND_API_KEY not set. Email not sent for reference:", params.reference);
    return { success: false, message: "RESEND_API_KEY missing in .env" };
  }

  if (!fromEmail || fromEmail.includes("onboarding@resend.dev")) {
    console.warn("[EMAIL] RESEND_FROM_EMAIL is not set or is using the sandbox address. Set a verified domain email in .env");
    // Don't block in development, but log prominently
  }

  const resend = new Resend(apiKey);
  const courseLink = params.courseLink || process.env.NEXT_PUBLIC_APP_URL || "https://princeofforex.com";
  const from = fromEmail && !fromEmail.includes("onboarding@resend.dev")
    ? fromEmail
    : "Prince of Forex Academy <onboarding@resend.dev>"; // sandbox fallback for dev only

  try {
    const data = await resend.emails.send({
      from,
      to: [params.toEmail],
      subject: `Your Course Access: ${params.courseTitle}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 16px; background-color: #ffffff;">
          <div style="background-color: #1E0306; padding: 20px; text-align: center; border-radius: 12px; margin-bottom: 24px;">
            <h1 style="color: #ED3C52; margin: 0; font-size: 22px; letter-spacing: 2px;">PRINCE OF FOREX</h1>
            <p style="color: #fde9ec; margin: 6px 0 0 0; font-size: 11px; text-transform: uppercase; letter-spacing: 3px;">PFX ACADEMY — OFFICIAL COURSE ACCESS</p>
          </div>

          <h2 style="color: #1E0306; margin-top: 0; font-size: 20px;">Welcome to the course! 🎉</h2>
          <p style="color: #565656; font-size: 14px; line-height: 1.6;">
            Your payment of <strong>$${params.amountPaid.toFixed(2)}</strong> has been confirmed successfully.
            <br/>Transaction Reference: <code style="background:#f1f5f9;padding:2px 6px;border-radius:4px;font-size:12px;">${params.reference}</code>
          </p>

          <div style="background-color: #FDE9EC; padding: 20px; border-radius: 12px; border: 1px solid #f2d8dc; margin: 20px 0;">
            <h3 style="color: #1E0306; margin-top: 0; font-size: 16px;">You are now enrolled in:</h3>
            <p style="color: #1E0306; font-weight: bold; margin: 4px 0 12px 0; font-size: 15px;">${params.courseTitle}</p>
            <ul style="color: #565656; font-size: 13px; padding-left: 20px; margin: 0 0 16px 0; line-height: 1.8;">
              <li>30 Detailed Video Chapters</li>
              <li>50 Quizzes &amp; 2 Practice Exams</li>
              <li>10 Hours Total Content</li>
              <li>Full Lifetime Access</li>
              <li>Shareable Certificate upon Completion</li>
            </ul>
            <div style="text-align: center; margin-top: 16px;">
              <a href="${courseLink}" style="background-color: #ED3C52; color: #ffffff; text-decoration: none; padding: 13px 28px; font-weight: bold; border-radius: 10px; display: inline-block; font-size: 14px;">
                Access Your Course Now &rarr;
              </a>
            </div>
          </div>

          <p style="color: #707070; font-size: 12px; line-height: 1.5;">
            If you have any questions, simply reply to this email and the PFX team will get back to you.
          </p>

          <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 20px 0;" />
          <p style="color: #a0a0a0; font-size: 11px; text-align: center; margin: 0;">
            &copy; ${new Date().getFullYear()} Prince of Forex (PFX Academy). All rights reserved.
          </p>
        </div>
      `,
    });

    return { success: true, data };
  } catch (error: any) {
    console.error("Resend email dispatch error:", error);
    return { success: false, error: error.message };
  }
}
