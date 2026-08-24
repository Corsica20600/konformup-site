import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Breadcrumb, Page } from "@/components/site-shell";
import { site, trainings } from "@/lib/site-config";
import { pageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return trainings.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const training = trainings.find((item) => item.slug === slug);

  if (!training) return {};

  return pageMetadata({
    title: `${training.title} en Corse et sur le continent`,
    description: `${training.summary} Intervention à organiser en Corse ou sur le continent selon votre besoin.`,
    path: `/formations/${training.slug}`,
  });
}

export default async function TrainingPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const training = trainings.find((item) => item.slug === slug);
  if (!training) notFound();

  const isSst = training.slug === "sst-initiale" || training.slug === "mac-sst";
  const courseJsonLd = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: training.title,
    description: training.summary,
    provider: { "@type": "Organization", name: site.name, url: site.url },
    url: `${site.url}/formations/${training.slug}`,
  };

  return (
    <Page>
      <section className="page-hero">
        <Breadcrumb current={training.title} />
        <p className="eyebrow gold">{training.eyebrow}</p>
        <h1>{training.title}</h1>
        <p className="lead">{training.summary}</p>
        <Link className="button" href="/demande-devis">Demander un devis</Link>
      </section>
      <section className="section detail-grid">
        <aside>
          <p><b>Public</b>{training.audience}</p>
          <p><b>Prérequis</b>{training.prerequisites}</p>
          {training.duration ? <p><b>Durée</b>{training.duration}</p> : null}
        </aside>
        <div>
          <h2>Objectifs</h2>
          <ul>{training.objectives.map((item) => <li key={item}>{item}</li>)}</ul>
          <h2>Programme synthétique</h2>
          <ol>{training.programme.map((item) => <li key={item}>{item}</li>)}</ol>
          <h2>Modalités pédagogiques</h2>
          <p>Apports ciblés, échanges, démonstrations, exercices et mises en situation adaptés à la session. L’accessibilité est étudiée en amont avec la personne concernée et l’entreprise.</p>
          {isSst ? <><h2>Accessibilité</h2><p>Une référente handicap est disponible pour étudier les besoins d’adaptation liés à la formation SST et préparer les conditions d’accueil avec l’entreprise.</p></> : null}
          <h2>Évaluation</h2>
          <p>{training.evaluation}</p>
          {training.certificate ? <p className="note">{training.certificate}</p> : null}
        </div>
      </section>
      <section className="cta"><h2>Parlons de votre contexte.</h2><Link className="button" href="/demande-devis">Demander un devis</Link></section>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(courseJsonLd) }} />
    </Page>
  );
}
