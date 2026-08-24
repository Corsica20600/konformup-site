import { ImageResponse } from "next/og";

export const alt = "Konform’up — formations en entreprise";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "68px", background: "linear-gradient(135deg, #fffaf5 0%, #e2eee4 58%, #f8ddd2 100%)", color: "#20332f" }}>
      <div style={{ display: "flex", fontSize: 36, letterSpacing: 8, textTransform: "uppercase", color: "#58776b" }}>Konform’up</div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex", fontSize: 84, fontWeight: 700, lineHeight: 1.02 }}>Former pour agir juste.</div>
        <div style={{ display: "flex", marginTop: 28, fontSize: 32, color: "#426159" }}>SST · Premiers secours · Hygiène · IA</div>
      </div>
      <div style={{ display: "flex", fontSize: 26, color: "#725c4e" }}>Formations en entreprise · Corse & continent</div>
    </div>,
    size,
  );
}
