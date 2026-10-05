import { ImageResponse } from "next/og";
import { contact, dictionaries, isLocale } from "@/lib/i18n";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = isLocale(locale) ? dictionaries[locale] : dictionaries.cs;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 88px",
          background: "#16131c",
          color: "#f1ecf7",
          fontFamily: "Helvetica, Arial, sans-serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 40, fontWeight: 800 }}>
          zeynep<span style={{ color: "#c6b3ff" }}>.</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ display: "flex", fontSize: 120, fontWeight: 800, letterSpacing: -4, lineHeight: 1 }}>
            {contact.name}
          </div>
          <div style={{ display: "flex", fontSize: 40, color: "#a99fba" }}>{dict.role}</div>
        </div>
        <div style={{ display: "flex", gap: 16 }}>
          <div style={{ display: "flex", width: 120, height: 14, borderRadius: 99, background: "#c6b3ff" }} />
          <div style={{ display: "flex", width: 60, height: 14, borderRadius: 99, background: "#ffd98a" }} />
        </div>
      </div>
    ),
    { ...size }
  );
}
