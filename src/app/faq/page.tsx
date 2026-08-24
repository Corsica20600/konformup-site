import { Breadcrumb, Page } from "@/components/site-shell";
import { shortFaq } from "@/lib/site-config";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "FAQ formations SST, hygiène et IA",
  description: "Les réponses aux questions fréquentes sur l’organisation des formations Konform’up en Corse et sur le continent.",
  path: "/faq",
});

const more = [
  ["Comment préparer une demande de devis ?", "Indiquez le besoin, le nombre estimé de participants, le lieu et la période souhaitée. Nous revenons vers vous pour préciser l’organisation."],
  ["Comment est prise en compte l’accessibilité ?", "Les besoins d’adaptation sont étudiés avant la formation afin de déterminer les conditions d’accueil et les ajustements possibles."],
  ["Les avis affichés sont-ils vérifiés ?", "Un avis n’est affiché que s’il est complété, accompagné du consentement requis et approuvé pour publication."],
] as const;

const questions = [...shortFaq, ...more];

export default function Faq() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: questions.map(([question, answer]) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: { "@type": "Answer", text: answer },
    })),
  };

  return <Page><section className="page-hero"><Breadcrumb current="FAQ"/><p className="eyebrow gold">Avant de démarrer</p><h1>Les réponses aux questions les plus fréquentes.</h1></section><section className="section faq-short">{questions.map(([question, answer]) => <details key={question}><summary>{question}</summary><p>{answer}</p></details>)}</section><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} /></Page>;
}
