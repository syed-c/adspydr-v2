import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY || 'replaceholder');

export async function sendVerificationEmail(userId: string, email: string) {
  try {
    await resend.emails.send({
      from: 'Ads SpyDR <noreply@adspydr.com>',
      to: email,
      subject: 'Verify your Ads SpyDR account',
      html: `<p>Click the link below to verify your account:</p>
        <a href="${process.env.NEXT_PUBLIC_APP_URL}/auth/verify?userId=${userId}">
          Verify Account
        </a>`,
    });
  } catch (error) {
    console.error('Failed to send verification email:', error);
  }
}

export async function sendAlertEmail({
  to,
  subject,
  html,
}: {
  to: string;
  subject: string;
  html: string;
}) {
  try {
    await resend.emails.send({
      from: 'Ads SpyDR Alerts <noreply@adspydr.com>',
      to,
      subject,
      html,
    });
  } catch (error) {
    console.error('Failed to send alert email:', error);
  }
}