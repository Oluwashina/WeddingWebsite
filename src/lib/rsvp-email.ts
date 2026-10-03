import nodemailer from "nodemailer";
import type { RsvpRecord } from "@/lib/types";

/** Comma- or semicolon-separated list from env (e.g. RSVP_NOTIFY_EMAIL). */
function parseEmailList(raw: string | undefined): string[] {
  if (!raw?.trim()) return [];
  return raw
    .split(/[,;]/)
    .map((part) => part.trim())
    .filter(Boolean);
}

function formatRecord(record: RsvpRecord): { text: string; html: string } {
  const attending = record.attending === "yes" ? "Yes, celebrating with you" : "Unable to attend";
  const message = record.message?.trim() || "—";
  const submitted = new Date(record.createdAt).toLocaleString("en-NG", {
    dateStyle: "full",
    timeStyle: "short",
    timeZone: "Africa/Lagos",
  });

  const lines = [
    `Reference: ${record.reference}`,
    `Name: ${record.fullName}`,
    `Contact: ${record.contact}`,
    `Attending: ${attending}`,
    `Message: ${message}`,
    `Submitted: ${submitted}`,
  ];

  const html = `
    <div style="font-family: Georgia, serif; color: #1d1916; line-height: 1.6;">
      <p style="font-size: 12px; letter-spacing: 0.2em; text-transform: uppercase; color: #c97885;">New RSVP</p>
      <h1 style="font-size: 22px; font-weight: normal; margin: 0 0 16px;">${record.fullName}</h1>
      <table style="border-collapse: collapse; width: 100%; max-width: 480px;">
        ${[
          ["Reference", record.reference],
          ["Contact", record.contact],
          ["Attending", attending],
          ["Message", message],
          ["Submitted", submitted],
        ]
          .map(
            ([label, value]) => `
          <tr>
            <td style="padding: 8px 12px 8px 0; vertical-align: top; font-size: 11px; text-transform: uppercase; letter-spacing: 0.12em; color: #6b6560; width: 38%;">${label}</td>
            <td style="padding: 8px 0; color: #1d1916;">${value}</td>
          </tr>`,
          )
          .join("")}
      </table>
    </div>
  `.trim();

  return { text: lines.join("\n"), html };
}

/**
 * Sends RSVP details to RSVP_NOTIFY_EMAIL (comma-separated for multiple inboxes).
 * Optional RSVP_NOTIFY_CC adds copy recipients. Defaults to GMAIL_USER when unset.
 * In production, missing config or a failed send throws so the API can surface an error.
 * In local dev without env vars, skips quietly so `.data/rsvps.json` still works.
 */
export async function sendRsvpNotification(record: RsvpRecord): Promise<void> {
  if (record.attending !== "yes") {
    return;
  }

  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD?.replace(/\s/g, "");
  const toList = parseEmailList(process.env.RSVP_NOTIFY_EMAIL);
  const ccList = parseEmailList(process.env.RSVP_NOTIFY_CC);
  const to = toList.length > 0 ? toList : user ? [user] : [];

  if (!user || !pass || to.length === 0) {
    if (process.env.NODE_ENV === "production") {
      throw new Error("RSVP email is not configured (GMAIL_USER / GMAIL_APP_PASSWORD).");
    }
    return;
  }

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: { user, pass },
  });

  const { text, html } = formatRecord(record);
  const subject = `RSVP yes: ${record.fullName} (${record.reference})`;

  await transporter.sendMail({
    from: `"#LOVETV RSVP" <${user}>`,
    to: to.length === 1 ? to[0] : to,
    ...(ccList.length > 0 ? { cc: ccList.length === 1 ? ccList[0] : ccList } : {}),
    replyTo: record.contact.includes("@") ? record.contact : undefined,
    subject,
    text,
    html,
  });
}
