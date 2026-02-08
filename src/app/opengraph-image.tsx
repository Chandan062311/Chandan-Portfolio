import { ImageResponse } from "next/og";

export const alt = "Chandan Satwani – AI Engineer & Data Scientist";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px 100px",
          background: "linear-gradient(145deg, #111720 0%, #080B0F 100%)",
          fontFamily: "system-ui, -apple-system, sans-serif",
        }}
      >
        {/* Scan lines decoration */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 4,
            background: "linear-gradient(90deg, transparent, #D88A2A, transparent)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 4,
            background: "linear-gradient(90deg, transparent, #5FA8A0, transparent)",
          }}
        />

        {/* Name */}
        <div
          style={{
            fontSize: 72,
            fontWeight: 800,
            color: "#F1F5F9",
            letterSpacing: "-1px",
            marginBottom: 16,
          }}
        >
          Chandan Satwani
        </div>

        {/* Title */}
        <div
          style={{
            fontSize: 34,
            fontWeight: 500,
            color: "#D88A2A",
            marginBottom: 40,
          }}
        >
          AI Engineer &amp; Data Scientist | GenAI · MLOps
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: 24,
            color: "#C1CBD6",
            lineHeight: 1.5,
            maxWidth: 800,
          }}
        >
          Turning research papers into playable AI experiences — shipped from Chandan AI Labs.
        </div>

        {/* Accent dot */}
        <div
          style={{
            position: "absolute",
            top: 80,
            right: 100,
            width: 24,
            height: 24,
            borderRadius: "50%",
            background: "#5FA8A0",
            opacity: 0.7,
          }}
        />
      </div>
    ),
    { ...size }
  );
}
