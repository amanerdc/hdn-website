import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

const allowedPrograms = ['Little Pollinators', 'Senior Pollinators', 'Harvesters', 'Beekeepers'] as const;

type Program = (typeof allowedPrograms)[number];

export async function POST(request: NextRequest) {
  try {
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = (process.env.SMTP_PASS || '').replace(/\s+/g, '');
    const mailTo = process.env.MAIL_TO || 'hdnintegratedfarm.ph@gmail.com';

    if (!smtpUser || !smtpPass) {
      return NextResponse.json({ error: 'Email service is not configured' }, { status: 500 });
    }

    const body = await request.json();
    const {
      firstName,
      lastName,
      age,
      schoolOrOrganization,
      email,
      phone,
      program,
      message,
    } = body as {
      firstName?: string;
      lastName?: string;
      age?: string;
      schoolOrOrganization?: string;
      email?: string;
      phone?: string;
      program?: Program;
      message?: string;
    };

    if (!firstName || !lastName || !age || !schoolOrOrganization || !email || !phone || !program) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    if (!allowedPrograms.includes(program)) {
      return NextResponse.json({ error: 'Invalid membership program selected' }, { status: 400 });
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    const mailOptions = {
      from: smtpUser,
      to: mailTo,
      replyTo: email,
      subject: 'New Membership Sign Up Request',
      html: `
        <div style="margin:0;padding:24px;background:#f3f8f3;font-family:Arial,sans-serif;color:#1f2937;">
          <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="max-width:680px;margin:0 auto;background:#ffffff;border:1px solid #d7e8da;border-radius:14px;overflow:hidden;">
            <tr>
              <td style="background:#234b39;padding:20px 24px;color:#ffffff;">
                <p style="margin:0;font-size:12px;letter-spacing:1px;text-transform:uppercase;opacity:0.85;">HDN Integrated Farm</p>
                <h1 style="margin:8px 0 0;font-size:22px;line-height:1.3;">New Membership Sign Up</h1>
              </td>
            </tr>
            <tr>
              <td style="padding:22px 24px;">
                <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom:14px;border-collapse:collapse;background:#f9fcf9;border:1px solid #e2ece4;border-radius:10px;overflow:hidden;">
                  <tr><td style="padding:12px 14px;border-bottom:1px solid #e2ece4;width:42%;font-weight:700;color:#234b39;">First Name</td><td style="padding:12px 14px;border-bottom:1px solid #e2ece4;">${firstName}</td></tr>
                  <tr><td style="padding:12px 14px;border-bottom:1px solid #e2ece4;font-weight:700;color:#234b39;">Last Name</td><td style="padding:12px 14px;border-bottom:1px solid #e2ece4;">${lastName}</td></tr>
                  <tr><td style="padding:12px 14px;border-bottom:1px solid #e2ece4;font-weight:700;color:#234b39;">Age</td><td style="padding:12px 14px;border-bottom:1px solid #e2ece4;">${age}</td></tr>
                  <tr><td style="padding:12px 14px;border-bottom:1px solid #e2ece4;font-weight:700;color:#234b39;">School / Organization</td><td style="padding:12px 14px;border-bottom:1px solid #e2ece4;">${schoolOrOrganization}</td></tr>
                  <tr><td style="padding:12px 14px;border-bottom:1px solid #e2ece4;font-weight:700;color:#234b39;">Email</td><td style="padding:12px 14px;border-bottom:1px solid #e2ece4;">${email}</td></tr>
                  <tr><td style="padding:12px 14px;border-bottom:1px solid #e2ece4;font-weight:700;color:#234b39;">Phone</td><td style="padding:12px 14px;border-bottom:1px solid #e2ece4;">${phone}</td></tr>
                  <tr><td style="padding:12px 14px;font-weight:700;color:#234b39;">Program</td><td style="padding:12px 14px;">${program}</td></tr>
                </table>
                <div style="padding:14px;border:1px solid #e2ece4;border-radius:10px;background:#ffffff;">
                  <p style="margin:0 0 8px;font-weight:700;color:#234b39;">Message</p>
                  <p style="margin:0;font-size:14px;line-height:1.6;color:#374151;">${message ? message.replace(/\n/g, '<br>') : 'None provided'}</p>
                </div>
              </td>
            </tr>
          </table>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    const confirmationOptions = {
      from: smtpUser,
      to: email,
      subject: 'Membership Sign Up Received - HDN Integrated Farm',
      html: `
        <div style="margin:0;padding:24px;background:#f3f8f3;font-family:Arial,sans-serif;color:#1f2937;">
          <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="max-width:680px;margin:0 auto;background:#ffffff;border:1px solid #d7e8da;border-radius:14px;overflow:hidden;">
            <tr>
              <td style="background:#234b39;padding:20px 24px;color:#ffffff;">
                <p style="margin:0;font-size:12px;letter-spacing:1px;text-transform:uppercase;opacity:0.85;">HDN Integrated Farm</p>
                <h1 style="margin:8px 0 0;font-size:22px;line-height:1.3;">Your Sign Up Was Received</h1>
              </td>
            </tr>
            <tr>
              <td style="padding:22px 24px;">
                <p style="margin:0 0 10px;font-size:15px;">Hi ${firstName},</p>
                <p style="margin:0 0 16px;font-size:14px;line-height:1.6;color:#4b5563;">Thank you for signing up. We received your request for <strong>${program}</strong> and our team will contact you with the next steps.</p>
                <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;background:#f9fcf9;border:1px solid #e2ece4;border-radius:10px;overflow:hidden;">
                  <tr><td style="padding:12px 14px;border-bottom:1px solid #e2ece4;width:42%;font-weight:700;color:#234b39;">Program</td><td style="padding:12px 14px;border-bottom:1px solid #e2ece4;">${program}</td></tr>
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
      { success: true, message: 'Your membership sign up has been sent successfully.' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Membership signup error:', error);
    return NextResponse.json({ error: 'Failed to process your membership request' }, { status: 500 });
  }
}
