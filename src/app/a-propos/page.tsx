import Image from "next/image";

import { Breadcrumb, Page } from "@/components/site-shell";

export const metadata = { title: "À propos" };

export default function About() {
  return (
    <Page>
      <section className="page-hero">
        <Breadcrumb current="À propos" />
        <p className="eyebrow gold">L’histoire Konform’up</p>
        <h1>Faire de l’exigence un levier concret pour les équipes.</h1>
      </section>

      <section className="section narrative">
        <p className="intro">
          Konform’up est un organisme de formation créé par Karine et François Vannucci.
        </p>
        <p>
          Nous accompagnons les entreprises dans la structuration et la montée en compétences de leurs équipes en matière de sécurité, d’hygiène et de transformation digitale.
        </p>

        <figure className="team-photo">
          <Image
            src="/karine-francois-vannucci.png"
            alt="Karine et François Vannucci"
            width={1280}
            height={720}
            sizes="(max-width: 760px) 100vw, 880px"
          />
          <figcaption>
            <strong>Karine Vannucci</strong>, formatrice Konform’up, aux côtés de François Vannucci.
          </figcaption>
        </figure>

        <blockquote>
          Exigence réglementaire.
          <br />
          Opérationnalité terrain.
          <br />
          Performance organisationnelle.
        </blockquote>
        <p>
          Notre approche relie les obligations, les situations de travail et les décisions du quotidien. L’accompagnement IA reste une prestation distincte des formations réglementaires et du dispositif SST.
        </p>
      </section>
    </Page>
  );
}
