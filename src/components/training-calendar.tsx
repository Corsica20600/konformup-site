"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { PublicTrainingSession } from "@/lib/sessions";
import styles from "./training-calendar.module.css";

const monthFormatter = new Intl.DateTimeFormat("fr-FR", { month: "long", year: "numeric" });
const dateFormatter = new Intl.DateTimeFormat("fr-FR", { day: "numeric", month: "short" });
const weekdays = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];
const dateKey = (date: Date) => date.toISOString().slice(0, 10);
const parseDate = (value: string) => new Date(`${value}T12:00:00`);
const formatRange = (startDate: string, endDate: string) => startDate === endDate ? dateFormatter.format(parseDate(startDate)) : `${dateFormatter.format(parseDate(startDate))} – ${dateFormatter.format(parseDate(endDate))}`;
const requestHref = (session: PublicTrainingSession) => `/demande-devis?formation=${encodeURIComponent(session.label)}&session=${encodeURIComponent(session.id)}#formulaire-devis`;

export function TrainingCalendar({ sessions }: { sessions: PublicTrainingSession[] }) {
  const [month, setMonth] = useState(() => { const now = new Date(); return new Date(now.getFullYear(), now.getMonth(), 1); });
  const [filter, setFilter] = useState<"all" | PublicTrainingSession["trainingType"]>("all");
  const filtered = useMemo(() => sessions.filter((session) => filter === "all" || session.trainingType === filter), [filter, sessions]);
  const sessionDates = useMemo(() => { const dates = new Map<string, PublicTrainingSession[]>(); filtered.forEach((session) => { const start = parseDate(session.startDate); const end = parseDate(session.endDate); for (let cursor = new Date(start); cursor <= end; cursor.setDate(cursor.getDate() + 1)) { const key = dateKey(cursor); dates.set(key, [...(dates.get(key) ?? []), session]); } }); return dates; }, [filtered]);
  const firstWeekday = (month.getDay() + 6) % 7;
  const calendarStart = new Date(month.getFullYear(), month.getMonth(), 1 - firstWeekday);
  const days = Array.from({ length: 42 }, (_, index) => { const day = new Date(calendarStart); day.setDate(calendarStart.getDate() + index); return day; });

  if (!sessions.length) return <div className={`${styles.root} planning-empty`}><p className="eyebrow">Prochaines dates</p><h2>Les prochaines sessions interentreprises seront annoncées ici.</h2><p>Vous pouvez déjà nous indiquer vos besoins : les sessions intra-entreprise restent organisées sur mesure et ne sont jamais affichées publiquement.</p><Link href="/demande-devis#formulaire-devis" className="button">Demander un devis</Link></div>;

  return <div className={`training-calendar ${styles.root}`}>
    <div className="calendar-toolbar"><div><p className="eyebrow">Sessions interentreprises</p><h2>{monthFormatter.format(month)}</h2></div><div className="calendar-actions"><button type="button" onClick={() => setMonth(new Date(month.getFullYear(), month.getMonth() - 1, 1))} aria-label="Mois précédent">←</button><button type="button" onClick={() => { const now = new Date(); setMonth(new Date(now.getFullYear(), now.getMonth(), 1)); }}>Aujourd’hui</button><button type="button" onClick={() => setMonth(new Date(month.getFullYear(), month.getMonth() + 1, 1))} aria-label="Mois suivant">→</button></div></div>
    <div className="calendar-filters" aria-label="Filtrer les formations"><button className={filter === "all" ? "active" : ""} onClick={() => setFilter("all")}>Toutes</button><button className={filter === "sst_initial" ? "active" : ""} onClick={() => setFilter("sst_initial")}>SST</button><button className={filter === "mac_sst" ? "active" : ""} onClick={() => setFilter("mac_sst")}>MAC SST</button><button className={filter === "hygiene" ? "active" : ""} onClick={() => setFilter("hygiene")}>Hygiène</button><button className={filter === "ai" ? "active" : ""} onClick={() => setFilter("ai")}>IA</button></div>
    <div className="calendar-grid" role="grid" aria-label={`Planning de ${monthFormatter.format(month)}`}>{weekdays.map((day) => <span className="calendar-weekday" key={day}>{day}</span>)}{days.map((day) => { const key = dateKey(day); const daySessions = sessionDates.get(key) ?? []; return <div className={`calendar-day${day.getMonth() !== month.getMonth() ? " muted" : ""}${daySessions.length ? " has-session" : ""}`} key={key} role="gridcell"><span>{day.getDate()}</span>{daySessions.slice(0, 2).map((session) => <a href={`#session-${session.id}`} key={session.id}>{session.label.replace("Formation ", "")}</a>)}</div>; })}</div>
    <div className="calendar-session-list">{filtered.filter((session) => session.startDate.slice(0, 7) === `${month.getFullYear()}-${String(month.getMonth() + 1).padStart(2, "0")}`).map((session) => <article id={`session-${session.id}`} key={session.id} className="calendar-session"><p className="eyebrow">Interentreprises</p><h3>{session.label}</h3><p><b>{formatRange(session.startDate, session.endDate)}</b><br />{session.location}</p><Link href={requestHref(session)} className="text-link">Demander des informations <span>→</span></Link></article>)}</div>
  </div>;
}
