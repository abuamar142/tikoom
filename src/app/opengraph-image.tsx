import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Tikoom - Temukan Event Seru di Sekitarmu";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 64,
          background:
            "linear-gradient(135deg, #fff7ed 0%, #f0fdfa 50%, #fffbeb 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          fontFamily: "Inter, sans-serif",
        }}
      >
        <div
          style={{
            fontSize: 96,
            fontWeight: 800,
            color: "#1c1917",
            marginBottom: 16,
          }}
        >
          Tikoom
        </div>
        <div
          style={{
            fontSize: 32,
            color: "#78716c",
            marginTop: 8,
          }}
        >
          Temukan Event Seru di Sekitarmu
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
