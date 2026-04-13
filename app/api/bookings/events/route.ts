import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { getActivities, getEvents } from '../../../../lib/site-content';

export async function POST(request: NextRequest) {
  try {
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = (process.env.SMTP_PASS || '').replace(/\s+/g, '');
    const mailTo = process.env.MAIL_TO || 'hdnintegratedfarm.ph@gmail.com';

    if (!smtpUser || !smtpPass) {
      return NextResponse.json({ error: 'Email service is not configured' }, { status: 500 });
    }

    const body = await request.json();
    const { name, email, phone, participants, message, eventId, bookingType } = body;
    const normalizedType = bookingType === 'activity' ? 'activity' : 'event';
    const [events, activities] = await Promise.all([getEvents(), getActivities()]);
    const selectedEvent = normalizedType === 'event' ? events.find((event) => event.id === Number(eventId)) : null;
    const selectedActivity = normalizedType === 'activity' ? activities.find((activity) => activity.id === Number(eventId)) : null;
    const selectedOffering = selectedEvent || selectedActivity;
    const availableSpots = selectedEvent ? selectedEvent.capacity - selectedEvent.booked : 0;
    const selectionIsAvailable = selectedEvent
      ? selectedEvent.availability && availableSpots > 0
      : selectedActivity
        ? selectedActivity.availability
        : false;
    const bookingLabel = normalizedType === 'activity' ? 'Activity' : 'Event';

    // Validate input
    if (!name || !email || !phone || !participants || !eventId) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    if (!selectedOffering || !selectionIsAvailable) {
      return NextResponse.json(
        { error: `Selected ${bookingLabel.toLowerCase()} is currently unavailable` },
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
      subject: `New ${bookingLabel} Booking Request`,
      html: `
        <div style="margin:0;padding:24px;background:#f3f8f3;font-family:Arial,sans-serif;color:#1f2937;">
          <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="max-width:680px;margin:0 auto;background:#ffffff;border:1px solid #d7e8da;border-radius:14px;overflow:hidden;">
            <tr>
              <td style="background:#234b39;padding:20px 24px;color:#ffffff;">
                <p style="margin:0;font-size:12px;letter-spacing:1px;text-transform:uppercase;opacity:0.85;">HDN Integrated Farm</p>
                <h1 style="margin:8px 0 0;font-size:22px;line-height:1.3;">New ${bookingLabel} Booking Request</h1>
              </td>
            </tr>
            <tr>
              <td style="padding:22px 24px;">
                <p style="margin:0 0 14px;font-size:14px;color:#4b5563;">A new ${bookingLabel.toLowerCase()} inquiry was submitted from the website.</p>

                <p style="margin:0 0 8px;font-size:13px;font-weight:700;color:#234b39;letter-spacing:0.4px;text-transform:uppercase;">Guest Information</p>
                <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom:14px;border-collapse:collapse;background:#f9fcf9;border:1px solid #e2ece4;border-radius:10px;overflow:hidden;">
                  <tr><td style="padding:12px 14px;border-bottom:1px solid #e2ece4;width:42%;font-weight:700;color:#234b39;">Name</td><td style="padding:12px 14px;border-bottom:1px solid #e2ece4;">${name}</td></tr>
                  <tr><td style="padding:12px 14px;border-bottom:1px solid #e2ece4;font-weight:700;color:#234b39;">Email</td><td style="padding:12px 14px;border-bottom:1px solid #e2ece4;">${email}</td></tr>
                  <tr><td style="padding:12px 14px;border-bottom:1px solid #e2ece4;font-weight:700;color:#234b39;">Phone</td><td style="padding:12px 14px;border-bottom:1px solid #e2ece4;">${phone}</td></tr>
                  <tr><td style="padding:12px 14px;font-weight:700;color:#234b39;">Participants</td><td style="padding:12px 14px;">${participants}</td></tr>
                </table>

                <p style="margin:0 0 8px;font-size:13px;font-weight:700;color:#234b39;letter-spacing:0.4px;text-transform:uppercase;">Selected ${bookingLabel}</p>
                <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom:14px;border-collapse:collapse;background:#f9fcf9;border:1px solid #e2ece4;border-radius:10px;overflow:hidden;">
                  <tr><td style="padding:12px 14px;border-bottom:1px solid #e2ece4;width:42%;font-weight:700;color:#234b39;">Type</td><td style="padding:12px 14px;border-bottom:1px solid #e2ece4;">${bookingLabel}</td></tr>
                  <tr><td style="padding:12px 14px;border-bottom:1px solid #e2ece4;font-weight:700;color:#234b39;">Title</td><td style="padding:12px 14px;border-bottom:1px solid #e2ece4;">${selectedOffering?.title ?? 'N/A'}</td></tr>
                  ${selectedEvent ? `<tr><td style="padding:12px 14px;border-bottom:1px solid #e2ece4;font-weight:700;color:#234b39;">Date</td><td style="padding:12px 14px;border-bottom:1px solid #e2ece4;">${selectedEvent.date}</td></tr>` : ''}
                  ${selectedEvent ? `<tr><td style="padding:12px 14px;border-bottom:1px solid #e2ece4;font-weight:700;color:#234b39;">Time</td><td style="padding:12px 14px;border-bottom:1px solid #e2ece4;">${selectedEvent.time}</td></tr>` : ''}
                  ${selectedActivity ? `<tr><td style="padding:12px 14px;border-bottom:1px solid #e2ece4;font-weight:700;color:#234b39;">Days Available</td><td style="padding:12px 14px;border-bottom:1px solid #e2ece4;">${selectedActivity.daysAvailable}</td></tr>` : ''}
                  ${selectedActivity ? `<tr><td style="padding:12px 14px;border-bottom:1px solid #e2ece4;font-weight:700;color:#234b39;">Schedule</td><td style="padding:12px 14px;border-bottom:1px solid #e2ece4;">${selectedActivity.schedule}</td></tr>` : ''}
                  ${selectedActivity ? `<tr><td style="padding:12px 14px;border-bottom:1px solid #e2ece4;font-weight:700;color:#234b39;">Duration</td><td style="padding:12px 14px;border-bottom:1px solid #e2ece4;">${selectedActivity.duration}</td></tr>` : ''}
                  ${selectedEvent ? `<tr><td style="padding:12px 14px;border-bottom:1px solid #e2ece4;font-weight:700;color:#234b39;">Duration</td><td style="padding:12px 14px;border-bottom:1px solid #e2ece4;">${selectedEvent.duration}</td></tr>` : ''}
                  <tr><td style="padding:12px 14px;border-bottom:1px solid #e2ece4;font-weight:700;color:#234b39;">Description</td><td style="padding:12px 14px;border-bottom:1px solid #e2ece4;">${selectedOffering?.description ?? 'N/A'}</td></tr>
                  ${selectedEvent ? `<tr><td style="padding:12px 14px;border-bottom:1px solid #e2ece4;font-weight:700;color:#234b39;">Capacity</td><td style="padding:12px 14px;border-bottom:1px solid #e2ece4;">${selectedEvent.capacity}</td></tr>` : ''}
                  ${selectedEvent ? `<tr><td style="padding:12px 14px;border-bottom:1px solid #e2ece4;font-weight:700;color:#234b39;">Booked</td><td style="padding:12px 14px;border-bottom:1px solid #e2ece4;">${selectedEvent.booked}</td></tr>` : ''}
                  <tr><td style="padding:12px 14px;border-bottom:1px solid #e2ece4;font-weight:700;color:#234b39;">Availability</td><td style="padding:12px 14px;border-bottom:1px solid #e2ece4;">${selectionIsAvailable ? 'Open' : 'Closed'}</td></tr>
                  <tr><td style="padding:12px 14px;font-weight:700;color:#234b39;">${bookingLabel} ID</td><td style="padding:12px 14px;">${eventId}</td></tr>
                </table>

                <div style="padding:14px;border:1px solid #e2ece4;border-radius:10px;background:#ffffff;">
                  <p style="margin:0 0 8px;font-weight:700;color:#234b39;">Special Requests</p>
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
      subject: `${bookingLabel} Booking Request Received - HDN Integrated Farm`,
      html: `
        <div style="margin:0;padding:24px;background:#f3f8f3;font-family:Arial,sans-serif;color:#1f2937;">
          <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="max-width:680px;margin:0 auto;background:#ffffff;border:1px solid #d7e8da;border-radius:14px;overflow:hidden;">
            <tr>
              <td style="background:#234b39;padding:20px 24px;color:#ffffff;">
                <p style="margin:0;font-size:12px;letter-spacing:1px;text-transform:uppercase;opacity:0.85;">HDN Integrated Farm</p>
                <h1 style="margin:8px 0 0;font-size:22px;line-height:1.3;">Your ${bookingLabel} Request Was Received</h1>
              </td>
            </tr>
            <tr>
              <td style="padding:22px 24px;">
                <p style="margin:0 0 10px;font-size:15px;">Hi ${name},</p>
                <p style="margin:0 0 16px;font-size:14px;line-height:1.6;color:#4b5563;">Thank you for your ${bookingLabel.toLowerCase()} booking inquiry. We received your request and will contact you soon to confirm your reservation details.</p>
                <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;background:#f9fcf9;border:1px solid #e2ece4;border-radius:10px;overflow:hidden;">
                  <tr><td style="padding:12px 14px;border-bottom:1px solid #e2ece4;width:42%;font-weight:700;color:#234b39;">Type</td><td style="padding:12px 14px;border-bottom:1px solid #e2ece4;">${bookingLabel}</td></tr>
                  <tr><td style="padding:12px 14px;border-bottom:1px solid #e2ece4;font-weight:700;color:#234b39;">${bookingLabel}</td><td style="padding:12px 14px;border-bottom:1px solid #e2ece4;">${selectedOffering?.title ?? 'To be confirmed'}</td></tr>
                  ${selectedEvent ? `<tr><td style="padding:12px 14px;border-bottom:1px solid #e2ece4;font-weight:700;color:#234b39;">Date</td><td style="padding:12px 14px;border-bottom:1px solid #e2ece4;">${selectedEvent.date}</td></tr>` : ''}
                  ${selectedEvent ? `<tr><td style="padding:12px 14px;border-bottom:1px solid #e2ece4;font-weight:700;color:#234b39;">Time</td><td style="padding:12px 14px;border-bottom:1px solid #e2ece4;">${selectedEvent.time}</td></tr>` : ''}
                  ${selectedActivity ? `<tr><td style="padding:12px 14px;border-bottom:1px solid #e2ece4;font-weight:700;color:#234b39;">Days Available</td><td style="padding:12px 14px;border-bottom:1px solid #e2ece4;">${selectedActivity.daysAvailable}</td></tr>` : ''}
                  ${selectedActivity ? `<tr><td style="padding:12px 14px;border-bottom:1px solid #e2ece4;font-weight:700;color:#234b39;">Schedule</td><td style="padding:12px 14px;border-bottom:1px solid #e2ece4;">${selectedActivity.schedule}</td></tr>` : ''}
                  <tr><td style="padding:12px 14px;border-bottom:1px solid #e2ece4;font-weight:700;color:#234b39;">Duration</td><td style="padding:12px 14px;border-bottom:1px solid #e2ece4;">${selectedOffering?.duration ?? 'To be confirmed'}</td></tr>
                  <tr><td style="padding:12px 14px;font-weight:700;color:#234b39;">Participants</td><td style="padding:12px 14px;">${participants}</td></tr>
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
    console.error('Experience booking error:', error);
    return NextResponse.json(
      { error: 'Failed to process your booking request' },
      { status: 500 }
    );
  }
}
