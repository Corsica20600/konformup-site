import Link from "next/link";

import { TrainingCalendar } from "@/components/training-calendar";
import { Breadcrumb, Page } from "@/components/site-shell";
import { pageMetadata } from "@/lib/seo";
import { getPublicTrainingSessions } from "@/lib/sessions";

export const metadata = pageMetadata({ title: "Planning des formations interentreprises", description: "Consultez les prochaines sessions interentreprises Konform’up : SST, MAC SST, hygiène et intelligence artificielle, en Corse et sur le continent.", path: "/planning" });
export const revalidate = 300;

export default async function PlanningPage() {
  const sessions = await getPublicTrainingSessions();
  return <Page><section className="page-hero compact"><Breadcrumb current="Planning"/><p className="eyebrow gold">Dates de formation</p><h1>Le planning des prochaines sessions.</h1><p className="lead">Ce calendrier affiche uniquement les sessions interentreprises. Les formations intra-entreprise se construisent directement avec vous, selon votre équipe et votre disponibilité.</p><p className="planning-price">Formation SST initiale <b>à partir de 250 € HT par personne</b>.</p></section><section className="section planning-section"><TrainingCalendar sessions={sessions}/><aside className="planning-note"><h2>Une date vous convient ?</h2><p>La réservation est confirmée après l’acceptation du devis. Une demande ne bloque donc pas une place sans validation conjointe.</p><Link href="/demande-devis#formulaire-devis" className="button">Demander un devis</Link></aside></section></Page>;
}
