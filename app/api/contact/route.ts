import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
  try {
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = (process.env.SMTP_PASS || '').replace(/\s+/g, '');
    const mailTo = process.env.MAIL_TO || 'hdnintegratedfarm.ph@gmail.com';

    if (!smtpUser || !smtpPass) {
      return NextResponse.json({ error: 'Email service is not configured' }, { status: 500 });
    }

    const body = await request.json();
    const { name, email, phone, subject, message } = body;

    // Validate input
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Create transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    // Email content
    const mailOptions = {
      from: smtpUser,
      to: mailTo,
      replyTo: email,
      subject: `New Contact Form Submission: ${subject}`,
      html: `
        <div style="margin:0;padding:24px;background:#f3f8f3;font-family:Arial,sans-serif;color:#1f2937;">
          <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="max-width:680px;margin:0 auto;background:#ffffff;border:1px solid #d7e8da;border-radius:14px;overflow:hidden;">
            <tr>
              <td style="background:#234b39;padding:20px 24px;color:#ffffff;">
                <p style="margin:0;font-size:12px;letter-spacing:1px;text-transform:uppercase;opacity:0.85;">HDN Integrated Farm</p>
                <h1 style="margin:8px 0 0;font-size:22px;line-height:1.3;">New Contact Form Message</h1>
              </td>
            </tr>
            <tr>
              <td style="padding:22px 24px;">
                <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom:14px;border-collapse:collapse;background:#f9fcf9;border:1px solid #e2ece4;border-radius:10px;overflow:hidden;">
                  <tr><td style="padding:12px 14px;border-bottom:1px solid #e2ece4;width:42%;font-weight:700;color:#234b39;">Name</td><td style="padding:12px 14px;border-bottom:1px solid #e2ece4;">${name}</td></tr>
                  <tr><td style="padding:12px 14px;border-bottom:1px solid #e2ece4;font-weight:700;color:#234b39;">Email</td><td style="padding:12px 14px;border-bottom:1px solid #e2ece4;">${email}</td></tr>
                  <tr><td style="padding:12px 14px;border-bottom:1px solid #e2ece4;font-weight:700;color:#234b39;">Phone</td><td style="padding:12px 14px;border-bottom:1px solid #e2ece4;">${phone || 'Not provided'}</td></tr>
                  <tr><td style="padding:12px 14px;font-weight:700;color:#234b39;">Subject</td><td style="padding:12px 14px;">${subject}</td></tr>
                </table>
                <div style="padding:14px;border:1px solid #e2ece4;border-radius:10px;background:#ffffff;">
                  <p style="margin:0 0 8px;font-weight:700;color:#234b39;">Message</p>
                  <p style="margin:0;font-size:14px;line-height:1.6;color:#374151;">${message.replace(/\n/g, '<br>')}</p>
                </div>
              </td>
            </tr>
          </table>
        </div>
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    // Send confirmation email to user
    const confirmationOptions = {
      from: smtpUser,
      to: email,
      subject: 'We received your message - HDN Integrated Farm',
      html: `
        <div style="margin:0;padding:24px;background:#f3f8f3;font-family:Arial,sans-serif;color:#1f2937;">
          <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="max-width:680px;margin:0 auto;background:#ffffff;border:1px solid #d7e8da;border-radius:14px;overflow:hidden;">
            <tr>
              <td style="background:#234b39;padding:20px 24px;color:#ffffff;">
                <p style="margin:0;font-size:12px;letter-spacing:1px;text-transform:uppercase;opacity:0.85;">HDN Integrated Farm</p>
                <h1 style="margin:8px 0 0;font-size:22px;line-height:1.3;">We Received Your Message</h1>
              </td>
            </tr>
            <tr>
              <td style="padding:22px 24px;">
                <p style="margin:0 0 10px;font-size:15px;">Hi ${name},</p>
                <p style="margin:0 0 16px;font-size:14px;line-height:1.6;color:#4b5563;">Thank you for reaching out. We have received your message and our team will get back to you as soon as possible.</p>
                <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;background:#f9fcf9;border:1px solid #e2ece4;border-radius:10px;overflow:hidden;">
                  <tr><td style="padding:12px 14px;border-bottom:1px solid #e2ece4;width:42%;font-weight:700;color:#234b39;">Subject</td><td style="padding:12px 14px;border-bottom:1px solid #e2ece4;">${subject}</td></tr>
                  <tr><td style="padding:12px 14px;font-weight:700;color:#234b39;">Email</td><td style="padding:12px 14px;">${email}</td></tr>
                </table>
                <p style="margin:16px 0 0;font-size:14px;line-height:1.6;color:#4b5563;">Best regards,<br>HDN Integrated Farm Team</p>
              </td>
            </tr>
          </table>
        </div>
      `,
    };

    await transporter.sendMail(confirmationOptions);

    return NextResponse.json(
      { success: true, message: 'Your message has been sent successfully.' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Failed to process your request' },
      { status: 500 }
    );
  }
}
