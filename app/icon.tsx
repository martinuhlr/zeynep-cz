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
          background: "#faf4ef",
          borderRadius: 16,
          border: "3px solid #c55c43",
        }}
      >
        <div
          style={{
            fontSize: 38,
            fontWeight: 700,
            color: "#ab3415",
            fontFamily: "Georgia, serif",
            fontStyle: "italic",
          }}
        >
          Z
        </div>
      </div>
    ),
    { ...size }
  );
}
