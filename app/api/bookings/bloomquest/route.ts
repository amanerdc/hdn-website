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
    const { fullName, group, position, email, phone, participants, details } = body;

    if (!fullName || !group || !position || !email || !phone || !participants) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    await transporter.sendMail({
      from: smtpUser,
      to: mailTo,
      replyTo: email,
      subject: 'New BloomQuest Booking Request',
      html: `
        <div style="margin:0;padding:24px;background:#f3f8f3;font-family:Arial,sans-serif;color:#1f2937;">
          <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="max-width:680px;margin:0 auto;background:#ffffff;border:1px solid #d7e8da;border-radius:14px;overflow:hidden;">
            <tr>
              <td style="background:#234b39;padding:20px 24px;color:#ffffff;">
                <p style="margin:0;font-size:12px;letter-spacing:1px;text-transform:uppercase;opacity:0.85;">HDN Integrated Farm</p>
                <h1 style="margin:8px 0 0;font-size:22px;line-height:1.3;">New BloomQuest Booking Request</h1>
              </td>
            </tr>
            <tr>
              <td style="padding:22px 24px;">
                <p style="margin:0 0 14px;font-size:14px;color:#4b5563;">A new BloomQuest inquiry was submitted from the website.</p>
                <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;background:#f9fcf9;border:1px solid #e2ece4;border-radius:10px;overflow:hidden;">
                  <tr><td style="padding:12px 14px;border-bottom:1px solid #e2ece4;width:42%;font-weight:700;color:#234b39;">Full Name</td><td style="padding:12px 14px;border-bottom:1px solid #e2ece4;">${fullName}</td></tr>
                  <tr><td style="padding:12px 14px;border-bottom:1px solid #e2ece4;font-weight:700;color:#234b39;">Group</td><td style="padding:12px 14px;border-bottom:1px solid #e2ece4;">${group}</td></tr>
                  <tr><td style="padding:12px 14px;border-bottom:1px solid #e2ece4;font-weight:700;color:#234b39;">Position</td><td style="padding:12px 14px;border-bottom:1px solid #e2ece4;">${position}</td></tr>
                  <tr><td style="padding:12px 14px;border-bottom:1px solid #e2ece4;font-weight:700;color:#234b39;">Email</td><td style="padding:12px 14px;border-bottom:1px solid #e2ece4;">${email}</td></tr>
                  <tr><td style="padding:12px 14px;border-bottom:1px solid #e2ece4;font-weight:700;color:#234b39;">Phone</td><td style="padding:12px 14px;border-bottom:1px solid #e2ece4;">${phone}</td></tr>
                  <tr><td style="padding:12px 14px;font-weight:700;color:#234b39;">Participants</td><td style="padding:12px 14px;">${participants}</td></tr>
                </table>
                <div style="margin-top:16px;padding:14px;border:1px solid #e2ece4;border-radius:10px;background:#ffffff;">
                  <p style="margin:0 0 8px;font-weight:700;color:#234b39;">Additional Details</p>
                  <p style="margin:0;font-size:14px;line-height:1.6;color:#374151;">${details ? details.replace(/\n/g, '<br>') : 'None provided'}</p>
                </div>
              </td>
            </tr>
          </table>
        </div>
      `,
    });

    await transporter.sendMail({
      from: smtpUser,
      to: email,
      subject: 'BloomQuest Booking Request Received - HDN Integrated Farm',
      html: `
        <div style="margin:0;padding:24px;background:#f3f8f3;font-family:Arial,sans-serif;color:#1f2937;">
          <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="max-width:680px;margin:0 auto;background:#ffffff;border:1px solid #d7e8da;border-radius:14px;overflow:hidden;">
            <tr>
              <td style="background:#234b39;padding:20px 24px;color:#ffffff;">
                <p style="margin:0;font-size:12px;letter-spacing:1px;text-transform:uppercase;opacity:0.85;">HDN Integrated Farm</p>
                <h1 style="margin:8px 0 0;font-size:22px;line-height:1.3;">Your BloomQuest Request Was Received</h1>
              </td>
            </tr>
            <tr>
              <td style="padding:22px 24px;">
                <p style="margin:0 0 10px;font-size:15px;">Hi ${fullName},</p>
                <p style="margin:0 0 16px;font-size:14px;line-height:1.6;color:#4b5563;">Thank you for your interest in BloomQuest. We received your request and our team will reach out soon to coordinate your visit.</p>
                <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;background:#f9fcf9;border:1px solid #e2ece4;border-radius:10px;overflow:hidden;">
                  <tr><td style="padding:12px 14px;border-bottom:1px solid #e2ece4;width:42%;font-weight:700;color:#234b39;">Group</td><td style="padding:12px 14px;border-bottom:1px solid #e2ece4;">${group}</td></tr>
                  <tr><td style="padding:12px 14px;font-weight:700;color:#234b39;">Participants</td><td style="padding:12px 14px;">${participants}</td></tr>
                </table>
                <p style="margin:16px 0 0;font-size:14px;line-height:1.6;color:#4b5563;">Best regards,<br>HDN Integrated Farm Team</p>
              </td>
            </tr>
          </table>
        </div>
      `,
    });

    return NextResponse.json(
      { success: true, message: 'Your BloomQuest booking request has been sent successfully.' },
      { status: 200 }
    );
  } catch (error) {
    console.error('BloomQuest booking error:', error);
    return NextResponse.json({ error: 'Failed to process your booking request' }, { status: 500 });
  }
}
