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
          background: "linear-gradient(135deg, #111720, #080B0F)",
          borderRadius: 36,
        }}
      >
        <span
          style={{
            fontSize: 120,
            fontWeight: 800,
            color: "#D88A2A",
            lineHeight: 1,
          }}
        >
          C
        </span>
        <div
          style={{
            position: "absolute",
            top: 30,
            right: 42,
            width: 14,
            height: 14,
            borderRadius: "50%",
            background: "#5FA8A0",
          }}
        />
      </div>
    ),
    { ...size }
  );
}
