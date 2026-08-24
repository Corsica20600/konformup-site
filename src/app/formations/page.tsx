import Link from "next/link";

import { Breadcrumb, Page } from "@/components/site-shell";
import { trainings } from "@/lib/site-config";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Formations en entreprise",
  description: "Découvrez les formations Konform’up à organiser en Corse et sur le continent : SST, MAC SST, premiers secours, hygiène et accompagnement IA.",
  path: "/formations",
});

export default function Formations() {
  return <Page><section className="page-hero"><Breadcrumb current="Formations"/><p className="eyebrow gold">Notre catalogue</p><h1>Former pour prévenir, décider et faire évoluer les pratiques.</h1><p className="lead">Des parcours à organiser en Corse ou sur le continent selon votre activité, vos équipes et vos contraintes.</p></section><section className="section"><div className="offer-grid">{trainings.map((training, index) => <Link key={training.slug} href={`/formations/${training.slug}`} className="offer"><span>0{index + 1}</span><h2>{training.title}</h2><p>{training.summary}</p><b>Voir le programme →</b></Link>)}</div></section></Page>;
}
