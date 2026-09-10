import { ImageResponse } from "next/og";
import { getWeddingContent } from "@/lib/content";

export const alt = "Tune in to #LOVETV";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * The card guests see when the link is pasted into WhatsApp. Rendered from the
 * same content source as the site, so it never drifts out of date.
 */
export default async function OpengraphImage() {
  const { couple, meta } = await getWeddingContent();

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(150deg, #e8a4ad 0%, #c97885 55%, #a85f6a 100%)",
          color: "#fbf7f1",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 34,
            border: "1px solid rgba(255,255,255,0.42)",
            borderRadius: 10,
          }}
        />

        <div
          style={{
            fontSize: 21,
            letterSpacing: 13,
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.85)",
          }}
        >
          {couple.invitationEyebrow ?? "Tune in to"}
        </div>

        <div
          style={{
            marginTop: 28,
            fontSize: 96,
            lineHeight: 1,
            letterSpacing: -1,
          }}
        >
          {couple.invitationHeadline ?? couple.hashtag}
        </div>

        <div
          style={{
            marginTop: 34,
            fontSize: 52,
            lineHeight: 1.1,
            display: "flex",
            alignItems: "center",
            gap: 20,
          }}
        >
          <span>{couple.brideFirstName}</span>
          <span style={{ color: "#1d1916", fontSize: 40 }}>&</span>
          <span>{couple.groomFirstName}</span>
        </div>

        <div style={{ marginTop: 38, display: "flex", alignItems: "center", gap: 22 }}>
          <span style={{ width: 70, height: 1, background: "rgba(255,255,255,0.55)" }} />
          <span style={{ fontSize: 24, letterSpacing: 7, color: "rgba(251,247,241,0.92)" }}>
            {meta.displayDate.toUpperCase()}
          </span>
          <span style={{ width: 70, height: 1, background: "rgba(255,255,255,0.55)" }} />
        </div>

        <div
          style={{
            position: "absolute",
            bottom: 66,
            fontSize: 19,
            letterSpacing: 6,
            color: "#1d1916",
          }}
        >
          {couple.hashtag}
        </div>
      </div>
    ),
    size,
  );
}
