import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import { getWeddingContent } from "@/lib/content";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const jost = Jost({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-jost",
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const { couple, meta } = await getWeddingContent();
  const title = `${couple.hashtag} — ${couple.shortNames}`;
  const description = `Tune in to ${couple.hashtag}. ${couple.shortNames} are getting married on ${meta.displayDate} in ${meta.displayLocation}. Open your invitation, RSVP, and find everything you need for the day.`;

  return {
    metadataBase: new URL(meta.siteUrl),
    title: {
      default: title,
      template: `%s — ${couple.shortNames}`,
    },
    description,
    applicationName: `${couple.shortNames} Wedding`,
    keywords: [couple.shortNames, "Nigerian wedding", "Lagos wedding", couple.hashtag],
    openGraph: {
      title,
      description,
      url: meta.siteUrl,
      siteName: `${couple.shortNames} — Wedding`,
      locale: "en_NG",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    robots: { index: true, follow: true },
  };
}

export const viewport: Viewport = {
  themeColor: "#fbf7f1",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${jost.variable}`}>
      <body>{children}</body>
    </html>
  );
}
