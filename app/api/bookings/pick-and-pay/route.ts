import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { getPickAndPayDates } from '../../../../lib/site-content';

export async function POST(request: NextRequest) {
  try {
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = (process.env.SMTP_PASS || '').replace(/\s+/g, '');
    const mailTo = process.env.MAIL_TO || 'hdnintegratedfarm.ph@gmail.com';

    if (!smtpUser || !smtpPass) {
      return NextResponse.json({ error: 'Email service is not configured' }, { status: 500 });
    }

    const body = await request.json();
    const { name, email, phone, participants, message, dateId } = body;
    const pickAndPayDates = await getPickAndPayDates();
    const selectedDate = pickAndPayDates.find((date) => date.id === Number(dateId));

    // Validate input
    if (!name || !email || !phone || !participants || !dateId) {
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
      subject: `New Pick & Pay Booking Request`,
      html: `
        <div style="margin:0;padding:24px;background:#f3f8f3;font-family:Arial,sans-serif;color:#1f2937;">
          <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="max-width:680px;margin:0 auto;background:#ffffff;border:1px solid #d7e8da;border-radius:14px;overflow:hidden;">
            <tr>
              <td style="background:#234b39;padding:20px 24px;color:#ffffff;">
                <p style="margin:0;font-size:12px;letter-spacing:1px;text-transform:uppercase;opacity:0.85;">HDN Integrated Farm</p>
                <h1 style="margin:8px 0 0;font-size:22px;line-height:1.3;">New Pick & Pay Booking Request</h1>
              </td>
            </tr>
            <tr>
              <td style="padding:22px 24px;">
                <p style="margin:0 0 14px;font-size:14px;color:#4b5563;">A new Pick & Pay inquiry was submitted from the website.</p>

                <p style="margin:0 0 8px;font-size:13px;font-weight:700;color:#234b39;letter-spacing:0.4px;text-transform:uppercase;">Guest Information</p>
                <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom:14px;border-collapse:collapse;background:#f9fcf9;border:1px solid #e2ece4;border-radius:10px;overflow:hidden;">
                  <tr><td style="padding:12px 14px;border-bottom:1px solid #e2ece4;width:42%;font-weight:700;color:#234b39;">Name</td><td style="padding:12px 14px;border-bottom:1px solid #e2ece4;">${name}</td></tr>
                  <tr><td style="padding:12px 14px;border-bottom:1px solid #e2ece4;font-weight:700;color:#234b39;">Email</td><td style="padding:12px 14px;border-bottom:1px solid #e2ece4;">${email}</td></tr>
                  <tr><td style="padding:12px 14px;border-bottom:1px solid #e2ece4;font-weight:700;color:#234b39;">Phone</td><td style="padding:12px 14px;border-bottom:1px solid #e2ece4;">${phone}</td></tr>
                  <tr><td style="padding:12px 14px;font-weight:700;color:#234b39;">Participants</td><td style="padding:12px 14px;">${participants}</td></tr>
                </table>

                <p style="margin:0 0 8px;font-size:13px;font-weight:700;color:#234b39;letter-spacing:0.4px;text-transform:uppercase;">Selected Schedule</p>
                <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom:14px;border-collapse:collapse;background:#f9fcf9;border:1px solid #e2ece4;border-radius:10px;overflow:hidden;">
                  <tr><td style="padding:12px 14px;border-bottom:1px solid #e2ece4;width:42%;font-weight:700;color:#234b39;">Date</td><td style="padding:12px 14px;border-bottom:1px solid #e2ece4;">${selectedDate?.date ?? 'N/A'}</td></tr>
                  <tr><td style="padding:12px 14px;border-bottom:1px solid #e2ece4;font-weight:700;color:#234b39;">Day of Week</td><td style="padding:12px 14px;border-bottom:1px solid #e2ece4;">${selectedDate?.dayOfWeek ?? 'N/A'}</td></tr>
                  <tr><td style="padding:12px 14px;border-bottom:1px solid #e2ece4;font-weight:700;color:#234b39;">Start Time</td><td style="padding:12px 14px;border-bottom:1px solid #e2ece4;">${selectedDate?.startTime ?? 'N/A'}</td></tr>
                  <tr><td style="padding:12px 14px;border-bottom:1px solid #e2ece4;font-weight:700;color:#234b39;">End Time</td><td style="padding:12px 14px;border-bottom:1px solid #e2ece4;">${selectedDate?.endTime ?? 'N/A'}</td></tr>
                  <tr><td style="padding:12px 14px;border-bottom:1px solid #e2ece4;font-weight:700;color:#234b39;">Available Spots</td><td style="padding:12px 14px;border-bottom:1px solid #e2ece4;">${selectedDate?.availableSpots ?? 'N/A'}</td></tr>
                  <tr><td style="padding:12px 14px;border-bottom:1px solid #e2ece4;font-weight:700;color:#234b39;">Booked</td><td style="padding:12px 14px;border-bottom:1px solid #e2ece4;">${selectedDate?.booked ?? 'N/A'}</td></tr>
                  <tr><td style="padding:12px 14px;font-weight:700;color:#234b39;">Date ID</td><td style="padding:12px 14px;">${dateId}</td></tr>
                </table>

                <div style="padding:14px;border:1px solid #e2ece4;border-radius:10px;background:#ffffff;">
                  <p style="margin:0 0 8px;font-weight:700;color:#234b39;">Special Notes</p>
                  <p style="margin:0;font-size:14px;line-height:1.6;color:#374151;">${message ? message.replace(/\n/g, '<br>') : 'None provided'}</p>
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
      subject: 'Pick & Pay Booking Request Received - HDN Integrated Farm',
      html: `
        <div style="margin:0;padding:24px;background:#f3f8f3;font-family:Arial,sans-serif;color:#1f2937;">
          <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="max-width:680px;margin:0 auto;background:#ffffff;border:1px solid #d7e8da;border-radius:14px;overflow:hidden;">
            <tr>
              <td style="background:#234b39;padding:20px 24px;color:#ffffff;">
                <p style="margin:0;font-size:12px;letter-spacing:1px;text-transform:uppercase;opacity:0.85;">HDN Integrated Farm</p>
                <h1 style="margin:8px 0 0;font-size:22px;line-height:1.3;">Your Pick & Pay Request Was Received</h1>
              </td>
            </tr>
            <tr>
              <td style="padding:22px 24px;">
                <p style="margin:0 0 10px;font-size:15px;">Hi ${name},</p>
                <p style="margin:0 0 16px;font-size:14px;line-height:1.6;color:#4b5563;">Thank you for your Pick & Pay booking inquiry. We received your request and will contact you soon to confirm your reservation details.</p>
                <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;background:#f9fcf9;border:1px solid #e2ece4;border-radius:10px;overflow:hidden;">
                  <tr><td style="padding:12px 14px;border-bottom:1px solid #e2ece4;width:42%;font-weight:700;color:#234b39;">Participants</td><td style="padding:12px 14px;border-bottom:1px solid #e2ece4;">${participants}</td></tr>
                  <tr><td style="padding:12px 14px;border-bottom:1px solid #e2ece4;font-weight:700;color:#234b39;">Date</td><td style="padding:12px 14px;border-bottom:1px solid #e2ece4;">${selectedDate?.date ?? 'To be confirmed'}</td></tr>
                  <tr><td style="padding:12px 14px;font-weight:700;color:#234b39;">Time</td><td style="padding:12px 14px;">${selectedDate ? `${selectedDate.startTime} - ${selectedDate.endTime}` : 'To be confirmed'}</td></tr>
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
      { success: true, message: 'Your booking request has been sent successfully.' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Pick & Pay booking error:', error);
    return NextResponse.json(
      { error: 'Failed to process your booking request' },
      { status: 500 }
    );
  }
}
