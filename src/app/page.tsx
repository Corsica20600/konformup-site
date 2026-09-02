import Image from "next/image";
import Link from "next/link";
import { Reviews } from "@/components/reviews";
import { TrainingCalendar } from "@/components/training-calendar";
import { Page } from "@/components/site-shell";
import { shortFaq, site, trainings } from "@/lib/site-config";
import { pageMetadata } from "@/lib/seo";
import { getPublicTrainingSessions } from "@/lib/sessions";

export const metadata = pageMetadata({ title: "Formations en entreprise en Corse et sur le continent", description: "Konform’up accompagne les entreprises en Corse et sur le continent avec des formations SST, MAC SST, premiers secours, hygiène et IA.", path: "/" });
export const revalidate = 300;

export default async function Home() {
  const sessions = await getPublicTrainingSessions();
  return <Page>
    <section className="hero"><div className="hero-copy"><p className="eyebrow gold">Formation en entreprise · Corse & continent</p><h1>Former pour <em>agir juste.</em></h1><p className="lead">SST, premiers secours, hygiène alimentaire et intelligence artificielle : des formations concrètes pour les entreprises en Corse et sur le continent, organisées autour de vos réalités de terrain.</p><div className="actions"><Link className="button" href="/demande-devis">Demander un devis</Link><Link className="text-link" href="/formations">Explorer les formations <span>→</span></Link></div></div><div className="hero-photo"><Image src="/hero-training.png" alt="Mise en situation pendant une formation en entreprise" fill priority sizes="(max-width: 800px) 100vw, 50vw"/><span>Apprendre en situation</span></div></section>
    <section className="section offers-section"><div className="section-title"><p className="eyebrow">Les offres Konform’up</p><h2>Quatre portes d’entrée.<br/><em>Une même exigence.</em></h2></div><div className="offer-grid">{trainings.map((t,n)=><Link key={t.slug} href={`/formations/${t.slug}`} className="offer"><span>0{n+1} — {t.eyebrow}</span><h3>{t.title}</h3><p>{t.summary}</p><b>Découvrir <i>→</i></b></Link>)}</div></section>
    <section className="trust-section"><div><p className="eyebrow">Repères vérifiés</p><h2>Des engagements qui se voient.</h2><p>Habilitation SST n° H38642/2026/SST-1/0/07.</p></div><div className="trust-logos"><Image src="/qualiopi-logo.png" alt="Qualiopi, processus certifié" width={190} height={95}/><Image src="/inrs-logo.svg" alt="INRS" width={130} height={61}/><Image src="/sst-formateur-logo.png" alt="Sauveteur secouriste du travail - niveau formateur" width={94} height={84}/></div></section>
    <section className="section planning-home"><div><p className="eyebrow">Planning interentreprises</p><h2>Choisir une prochaine session.</h2><p className="lead small">SST initiale à partir de <b>250 € HT par personne</b>. Les dates sont confirmées au devis accepté.</p></div><TrainingCalendar sessions={sessions}/><Link href="/planning" className="text-link">Voir le planning complet <span>→</span></Link></section>
    <section className="split-section dark"><div><p className="eyebrow gold">Une pédagogie active</p><h2>Le terrain comme point de départ.</h2><p>Les échanges, démonstrations, cas concrets et mises en situation servent un objectif simple : savoir quoi faire au bon moment.</p><Link href="/methode-pedagogique" className="text-link light">Découvrir la méthode <span>→</span></Link></div><ol className="steps"><li><b>01</b><span>Écouter votre contexte.</span></li><li><b>02</b><span>Faire vivre les situations.</span></li><li><b>03</b><span>Transformer les acquis en actions.</span></li></ol></section>
    <section className="section media-section"><div><p className="eyebrow">Au cœur de l’intervention</p><h2>Une présence qui fait progresser.</h2><p className="lead small">La vidéo de présentation sera ajoutée ici lorsque le média dont les droits sont confirmés sera disponible.</p></div><div className="experience-card"><Image src="/ai-workshop.png" alt="Atelier pratique sur les usages de l’intelligence artificielle" fill sizes="(max-width: 800px) 100vw, 50vw"/><div><span>Ateliers sur mesure</span><b>Le film de présentation arrive prochainement.</b></div></div></section>
    <section className="section"><p className="eyebrow">Avis clients</p><h2>Des retours publiés avec discernement.</h2><Reviews limit={3}/></section>
    <section className="section faq-short"><p className="eyebrow">Questions fréquentes</p><h2>Les réponses utiles, avant de vous engager.</h2>{shortFaq.map(([q,a])=><details key={q}><summary>{q}</summary><p>{a}</p></details>)}<Link href="/faq" className="text-link">Voir toutes les questions <span>→</span></Link></section>
    <section className="cta"><p className="eyebrow gold">Parlons de votre besoin</p><h2>Construisons une intervention utile à vos équipes.</h2><Link className="button" href="/demande-devis">Demander un devis</Link></section>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "Organization", name: site.name, url: site.url, email: site.contact.email, telephone: site.contact.phone, areaServed: ["Corse", "France métropolitaine"] }) }} />
  </Page>;
}
