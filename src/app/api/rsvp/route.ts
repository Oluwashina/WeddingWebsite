import { NextResponse } from "next/server";
import { rsvpRepository } from "@/lib/rsvp-repository";
import { validateRsvp } from "@/lib/rsvp-validation";
import type { RsvpResult } from "@/lib/types";

export async function POST(request: Request): Promise<NextResponse<RsvpResult>> {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  const { errors, value } = validateRsvp(payload as Record<string, never>);
  if (!value) {
    return NextResponse.json({ ok: false, fieldErrors: errors }, { status: 422 });
  }

  try {
    const record = await rsvpRepository.create(value);
    return NextResponse.json({ ok: true, reference: record.reference, record });
  } catch {
    return NextResponse.json(
      { ok: false, error: "We couldn't save your RSVP. Please try again or message us on WhatsApp." },
      { status: 500 },
    );
  }
}
