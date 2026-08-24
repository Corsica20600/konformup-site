"use client";

import { useState, type FormEvent } from "react";

type Kind = "contact" | "quote";

export function InquiryForm({ kind }: { kind: Kind }) {
  const [state, setState] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("sending");
    const form = event.currentTarget;
    const res = await fetch(`/api/forms/${kind}`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(Object.fromEntries(new FormData(form))) });
    const body = await res.json().catch(() => ({}));
    if (res.ok) { form.reset(); setState("success"); setMessage("Votre demande a bien été envoyée. Nous reviendrons vers vous prochainement."); }
    else { setState("error"); setMessage(body.error || "Votre demande n’a pas pu être envoyée. Réessayez plus tard ou contactez-nous par e-mail."); }
  }

  return <>
    <form id={kind === "quote" ? "formulaire-devis" : "formulaire-contact"} className="form" onSubmit={submit} aria-busy={state === "sending"}>
      <input name="website" tabIndex={-1} autoComplete="off" className="honeypot" aria-hidden="true" />
      {kind === "quote" ? <div className="form-grid"><Field name="firstName" label="Prénom" required /><Field name="lastName" label="Nom" required /><Field name="company" label="Entreprise" /><Field name="email" label="E-mail" type="email" required /><Field name="phone" label="Téléphone (facultatif)" type="tel" /><label>Formation recherchée<select name="training"><option value="">Sélectionner</option><option>SST initiale</option><option>MAC SST</option><option>Hygiène alimentaire</option><option>Premiers secours citoyen (PSC)</option><option>Gestes qui sauvent</option><option>Intelligence artificielle</option><option>Autre besoin</option></select></label><Field name="participants" label="Nombre approximatif de participants" /><Field name="location" label="Commune ou lieu" /><Field name="period" label="Période souhaitée" /></div> : <div className="form-grid"><Field name="firstName" label="Prénom" required /><Field name="lastName" label="Nom" required /><Field name="email" label="E-mail" type="email" required /><label>Motif<select name="subject"><option>Demande d’information</option><option>Formation</option><option>Partenariat</option><option>Autre</option></select></label></div>}
      <label>Message<textarea name="message" required rows={5} maxLength={3000} /></label>
      <label className="consent"><input type="checkbox" name="consent" required /><span>J’accepte que Konform’up utilise ces informations pour répondre à ma demande.</span></label>
      <button className="button" disabled={state === "sending"}>{state === "sending" ? "Envoi en cours…" : "Envoyer la demande"}</button>
      {state === "error" ? <p role="alert" className="form-error">{message}</p> : null}
    </form>
    {state === "success" ? <div className="submission-dialog" role="dialog" aria-modal="true" aria-labelledby="submission-title"><div className="submission-card"><span className="submission-check" aria-hidden="true">✓</span><p className="eyebrow">Demande envoyée</p><h2 id="submission-title">Merci pour votre message.</h2><p>{message}</p><button className="button" onClick={() => setState("idle")}>Fermer</button></div></div> : null}
  </>;
}

function Field({ name, label, type = "text", required = false }: { name: string; label: string; type?: string; required?: boolean }) {
  return <label>{label}<input name={name} type={type} required={required} maxLength={160} /></label>;
}
