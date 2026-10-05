import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
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
          borderRadius: 16,
          fontSize: 44,
          fontWeight: 800,
          fontFamily: "Helvetica, Arial, sans-serif",
          color: "#f1ecf7",
          paddingBottom: 6,
        }}
      >
        z<span style={{ color: "#c6b3ff" }}>.</span>
      </div>
    ),
    { ...size }
  );
}
