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
          alignItems: "center",
          justifyContent: "center",
          gap: 28,
          background: "#faf4ef",
          fontFamily: "Helvetica, Arial, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 24,
            width: 1040,
            padding: "64px 80px",
            borderRadius: 32,
            border: "3px solid #c55c43",
            background: "#faf2e9",
          }}
        >
          <div
            style={{
              fontSize: 108,
              fontWeight: 700,
              fontStyle: "italic",
              fontFamily: "Georgia, serif",
              color: "#ab3415",
            }}
          >
            {contact.name}
          </div>
          <div
            style={{
              fontSize: 32,
              fontWeight: 600,
              color: "#433830",
            }}
          >
            {dict.role}
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
