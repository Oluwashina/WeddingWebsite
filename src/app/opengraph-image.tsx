import { ImageResponse } from "next/og";
import { getWeddingContent } from "@/lib/content";

export const alt = "You're invited";
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
          background: "linear-gradient(150deg, #224036 0%, #16261f 55%, #0f1a15 100%)",
          color: "#fbf7f1",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 34,
            border: "1px solid rgba(214,189,142,0.42)",
            borderRadius: 10,
          }}
        />
        <div
          style={{
            position: "absolute",
            top: -140,
            right: -80,
            width: 520,
            height: 520,
            borderRadius: 999,
            background: "radial-gradient(circle, rgba(214,189,142,0.28), rgba(214,189,142,0))",
          }}
        />

        <div
          style={{
            fontSize: 21,
            letterSpacing: 13,
            textTransform: "uppercase",
            color: "#d6bd8e",
          }}
        >
          You&apos;re Invited
        </div>

        <div
          style={{
            marginTop: 34,
            fontSize: 116,
            lineHeight: 1,
            letterSpacing: -2,
            display: "flex",
            alignItems: "center",
            gap: 26,
          }}
        >
          <span>{couple.brideFirstName}</span>
          <span style={{ color: "#b0894e", fontSize: 74 }}>&</span>
          <span>{couple.groomFirstName}</span>
        </div>

        <div style={{ marginTop: 38, display: "flex", alignItems: "center", gap: 22 }}>
          <span style={{ width: 70, height: 1, background: "rgba(214,189,142,0.55)" }} />
          <span style={{ fontSize: 24, letterSpacing: 7, color: "rgba(251,247,241,0.82)" }}>
            {meta.displayDate.toUpperCase()}
          </span>
          <span style={{ width: 70, height: 1, background: "rgba(214,189,142,0.55)" }} />
        </div>

        <div
          style={{
            marginTop: 22,
            fontSize: 20,
            letterSpacing: 8,
            textTransform: "uppercase",
            color: "rgba(251,247,241,0.5)",
          }}
        >
          {meta.displayLocation}
        </div>

        <div
          style={{
            position: "absolute",
            bottom: 66,
            fontSize: 19,
            letterSpacing: 6,
            color: "#d6bd8e",
          }}
        >
          {couple.hashtag}
        </div>
      </div>
    ),
    size,
  );
}
