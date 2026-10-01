import { NextResponse } from "next/server";

const RESEND_API_KEY = process.env.RESEND_API_KEY || "";
const RECEIVER_EMAIL =
  process.env.CONTACT_RECEIVER_EMAIL || "shohaghossen79886@gmail.com";

export async function POST(request: Request) {
  try {
    if (!RESEND_API_KEY) {
      console.error("Missing RESEND_API_KEY in environment variables.");
      return NextResponse.json(
        {
          error:
            "Email service is not configured on this server. Please contact directly via " +
            RECEIVER_EMAIL,
        },
        { status: 500 }
      );
    }

    const body = await request.json();
    const { name, email, message, service, budget, subject } = body;

    // Validation
    if (!name || typeof name !== "string" || name.trim().length === 0) {
      return NextResponse.json(
        { error: "Name is required." },
        { status: 400 }
      );
    }

    if (
      !email ||
      typeof email !== "string" ||
      !email.includes("@") ||
      !email.includes(".")
    ) {
      return NextResponse.json(
        { error: "A valid email address is required." },
        { status: 400 }
      );
    }

    if (!message || typeof message !== "string" || message.trim().length === 0) {
      return NextResponse.json(
        { error: "Message cannot be empty." },
        { status: 400 }
      );
    }

    const emailSubject =
      subject ||
      `[Portfolio Inquiry] From ${name.trim()} - ${service || "General Project"}`;

    const formattedHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>New Portfolio Inquiry</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f4f4f5; margin: 0; padding: 24px; color: #18181b; }
    .card { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 16px; border: 1px solid #e4e4e7; padding: 32px; box-shadow: 0 10px 25px rgba(0,0,0,0.05); }
    .badge { display: inline-block; padding: 4px 12px; border-radius: 9999px; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; background-color: #fef3c7; color: #92400e; margin-bottom: 16px; }
    h1 { font-size: 22px; font-weight: 800; color: #09090b; margin-top: 0; margin-bottom: 20px; border-bottom: 1px solid #f4f4f5; padding-bottom: 16px; }
    .field { margin-bottom: 16px; }
    .label { font-size: 11px; font-weight: 700; text-transform: uppercase; color: #71717a; margin-bottom: 4px; letter-spacing: 0.05em; }
    .value { font-size: 15px; color: #09090b; font-weight: 500; }
    .message-box { background: #fafafa; border: 1px solid #e4e4e7; border-radius: 12px; padding: 18px; font-size: 14px; line-height: 1.6; color: #27272a; white-space: pre-wrap; margin-top: 20px; }
    .footer { margin-top: 28px; font-size: 12px; color: #a1a1aa; text-align: center; border-top: 1px solid #f4f4f5; padding-top: 16px; }
    .reply-btn { display: inline-block; background-color: #09090b; color: #ffffff; padding: 10px 20px; border-radius: 9999px; text-decoration: none; font-size: 13px; font-weight: 600; margin-top: 20px; }
  </style>
</head>
<body>
  <div class="card">
    <div class="badge">Shohag Hossen Portfolio</div>
    <h1>New Project Inquiry</h1>
    
    <div class="field">
      <div class="label">Sender Name</div>
      <div class="value">${escapeHtml(name)}</div>
    </div>
    
    <div class="field">
      <div class="label">Email Address</div>
      <div class="value"><a href="mailto:${escapeHtml(email)}" style="color: #d97706; text-decoration: none;">${escapeHtml(email)}</a></div>
    </div>
    
    ${
      service
        ? `
    <div class="field">
      <div class="label">Primary Scope / Service</div>
      <div class="value">${escapeHtml(service)}</div>
    </div>`
        : ""
    }
    
    ${
      budget
        ? `
    <div class="field">
      <div class="label">Estimated Budget</div>
      <div class="value">${escapeHtml(budget)}</div>
    </div>`
        : ""
    }

    <div class="field">
      <div class="label">Project Brief / Message</div>
      <div class="message-box">${escapeHtml(message)}</div>
    </div>

    <div style="text-align: center;">
      <a href="mailto:${escapeHtml(email)}?subject=Re: ${encodeURIComponent(emailSubject)}" class="reply-btn">
        Reply to ${escapeHtml(name)}
      </a>
    </div>

    <div class="footer">
      Sent on ${new Date().toUTCString()} via Shohag Hossen Portfolio website
    </div>
  </div>
</body>
</html>
    `;

    const plainText = `
New Project Inquiry via Shohag Hossen Portfolio
------------------------------------------------
From: ${name} (${email})
Scope: ${service || "Not specified"}
Budget: ${budget || "Not specified"}

Message:
${message}

------------------------------------------------
Sent on: ${new Date().toISOString()}
    `.trim();

    // Call Resend REST API directly
    const resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
        "User-Agent": "ShohagPortfolio/1.0",
      },
      body: JSON.stringify({
        from: "Shohag Portfolio <onboarding@resend.dev>",
        to: [RECEIVER_EMAIL],
        reply_to: email,
        subject: emailSubject,
        html: formattedHtml,
        text: plainText,
      }),
    });

    const resendData = await resendResponse.json();

    if (!resendResponse.ok) {
      console.error("Resend API error:", resendData);
      return NextResponse.json(
        {
          error:
            resendData.message ||
            "Failed to send email via Resend API. Please try again or email directly.",
        },
        { status: resendResponse.status }
      );
    }

    return NextResponse.json({
      success: true,
      id: resendData.id,
      message: "Email sent successfully!",
    });
  } catch (error: any) {
    console.error("Contact API route exception:", error);
    return NextResponse.json(
      { error: error?.message || "Internal server error occurred." },
      { status: 500 }
    );
  }
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
