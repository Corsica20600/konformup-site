import { NextRequest, NextResponse } from "next/server";
const recent = new Map<string, number[]>(); const windowMs=60_000, limit=4;
function allowed(request:NextRequest){const key=request.headers.get("x-forwarded-for")?.split(",")[0]?.trim()||"unknown"; const now=Date.now(); const hits=(recent.get(key)||[]).filter(t=>now-t<windowMs); if(hits.length>=limit)return false; hits.push(now);recent.set(key,hits);return true}
function clean(value:unknown,max=3000){return typeof value==="string"?value.trim().slice(0,max):""}
export async function POST(request: NextRequest, { params }: { params: Promise<{ kind: string }> }) {
  const { kind } = await params;
  if (kind !== "contact" && kind !== "quote") return NextResponse.json({ error: "Introuvable." }, { status: 404 });
  if (!allowed(request)) return NextResponse.json({ error: "Trop de demandes. Réessayez dans quelques instants." }, { status: 429 });
  let input: Record<string, unknown>;
  try { input = await request.json(); } catch { return NextResponse.json({ error: "Demande invalide." }, { status: 400 }); }
  if (clean(input.website) || !clean(input.firstName, 160) || !clean(input.lastName, 160) || !/^\S+@\S+\.\S+$/.test(clean(input.email, 160)) || !clean(input.message)) return NextResponse.json({ error: "Veuillez compléter les champs obligatoires." }, { status: 400 });
  if (input.consent !== "on" && input.consent !== true) return NextResponse.json({ error: "Votre consentement est nécessaire pour être contacté." }, { status: 400 });
  const recipient = process.env.ORGANIZATION_EMAIL || "contact@konformup.com";
  if (!process.env.BREVO_API_KEY) return NextResponse.json({ error: "L’envoi est temporairement indisponible. Vous pouvez nous écrire directement à contact@konformup.com." }, { status: 503 });
  const details = kind === "quote" ? [`Entreprise : ${clean(input.company, 160)}`, `Téléphone : ${clean(input.phone, 80)}`, `Formation : ${clean(input.training, 160)}`, `Participants : ${clean(input.participants, 80)}`, `Lieu : ${clean(input.location, 160)}`, `Période : ${clean(input.period, 160)}`] : [`Motif : ${clean(input.subject, 160)}`];
  const payload = { sender: { email: process.env.BREVO_SENDER_EMAIL || recipient, name: process.env.BREVO_SENDER_NAME || "Konform’up" }, to: [{ email: recipient }], subject: `[Site] ${kind === "quote" ? "Demande de devis" : "Message de contact"}`, textContent: ["Nouvelle demande reçue depuis le site public.", `Nom : ${clean(input.firstName, 160)} ${clean(input.lastName, 160)}`, `E-mail : ${clean(input.email, 160)}`, ...details, `Message : ${clean(input.message)}`].join("\n") };
  try { const response = await fetch("https://api.brevo.com/v3/smtp/email", { method: "POST", headers: { "api-key": process.env.BREVO_API_KEY, "content-type": "application/json" }, body: JSON.stringify(payload) }); if (!response.ok) return NextResponse.json({ error: "L’envoi est temporairement indisponible." }, { status: 503 }); } catch { return NextResponse.json({ error: "L’envoi est temporairement indisponible." }, { status: 503 }); }
  return NextResponse.json({ ok: true });
}
