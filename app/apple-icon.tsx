import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#16131c",
          fontSize: 120,
          fontWeight: 800,
          fontFamily: "Helvetica, Arial, sans-serif",
          color: "#f1ecf7",
          paddingBottom: 16,
        }}
      >
        z<span style={{ color: "#c6b3ff" }}>.</span>
      </div>
    ),
    { ...size }
  );
}
