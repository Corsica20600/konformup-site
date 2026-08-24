export const site = {
  name: "Konform’up",
  url: "https://www.konformup.com",
  description: "Formations SST, hygiène alimentaire et intelligence artificielle pour les entreprises.",
  contact: { email: "contact@konformup.com", phone: null as string | null },
  social: { instagram: "https://www.instagram.com/konformupcorse/", facebook: null as string | null, linkedin: null as string | null },
  legal: { address: null as string | null, siret: null as string | null, nda: null as string | null, publisher: null as string | null, host: "Vercel Inc." },
  media: { presentationVideo: null as string | null, presentationPoster: null as string | null },
  aiProvider: null as string | null,
} as const;

export type Training = {
  slug: string; title: string; eyebrow: string; summary: string; audience: string; prerequisites: string;
  duration?: string; objectives: string[]; programme: string[]; evaluation: string; certificate?: string;
};

export const trainings: Training[] = [
  { slug: "sst-initiale", title: "Formation SST initiale", eyebrow: "Prévention & secours", summary: "Développer des réflexes utiles face à une situation d’accident du travail et contribuer à la prévention.", audience: "Salariés désignés ou volontaires pour exercer la mission de SST dans leur entreprise.", prerequisites: "Aucun prérequis particulier.", duration: "14 heures en présentiel", objectives: ["Situer son rôle dans l’organisation des secours et de la prévention.", "Protéger, examiner, alerter et secourir de façon adaptée.", "Repérer une situation dangereuse et participer à sa prévention."], programme: ["Le rôle du SST dans l’entreprise et la prévention.", "Protection, examen de la victime et alerte.", "Gestes de secours et conduites à tenir.", "Mises en situation contextualisées et évaluation."], evaluation: "Évaluations formatives et certificatives selon le dispositif SST applicable.", certificate: "La délivrance et l’enregistrement du certificat relèvent du dispositif SST applicable ; les modalités sont confirmées avant la session." },
  { slug: "mac-sst", title: "MAC SST", eyebrow: "Maintien & actualisation", summary: "Actualiser les compétences du SST, partager les retours d’expérience et remettre les gestes en pratique.", audience: "Titulaires d’un certificat SST dont le maintien et l’actualisation sont à organiser.", prerequisites: "Être titulaire d’un certificat SST ou d’une attestation SST antérieure.", duration: "7 heures en présentiel", objectives: ["Actualiser les conduites à tenir.", "Renforcer la contribution à la prévention.", "S’entraîner sur des situations proches du terrain."], programme: ["Retour d’expérience et évolution du cadre d’intervention.", "Actualisation prévention et secours.", "Ateliers pratiques et mises en situation.", "Évaluations selon le dispositif applicable."], evaluation: "Évaluations formatives et certificatives selon le dispositif SST applicable.", certificate: "Les modalités de validation et d’enregistrement sont confirmées avant la session." },
  { slug: "hygiene-alimentaire", title: "Hygiène alimentaire", eyebrow: "Hygiène", summary: "Ancrer des pratiques d’hygiène adaptées à l’activité et à l’organisation de votre établissement.", audience: "Équipes concernées par la préparation, la manipulation ou le service de denrées alimentaires.", prerequisites: "À préciser lors de l’analyse de votre besoin.", objectives: ["Identifier les situations à risque dans le contexte de travail.", "Appliquer des pratiques d’hygiène cohérentes et traçables.", "Faire évoluer les gestes et l’organisation au quotidien."], programme: ["Analyse du contexte, des flux et des risques.", "Bonnes pratiques d’hygiène adaptées au métier.", "Prévention des contaminations et gestion des écarts.", "Cas pratiques liés à votre activité."], evaluation: "Les modalités d’évaluation et les documents remis sont définis avec vous dans le devis." },
  { slug: "intelligence-artificielle", title: "Intelligence artificielle en entreprise", eyebrow: "Prestation d’accompagnement", summary: "Découvrir des usages responsables de l’IA et les transformer en gains de temps concrets pour vos équipes.", audience: "Dirigeants, équipes administratives, commerciales ou opérationnelles souhaitant cadrer des usages utiles.", prerequisites: "Aucun niveau technique requis ; les cas d’usage sont définis avec l’entreprise.", objectives: ["Comprendre les possibilités et limites des assistants IA.", "Construire des usages responsables et adaptés au métier.", "Tester des automatisations et méthodes de travail utiles."], programme: ["Découverte des assistants IA et bonnes pratiques.", "Confidentialité, vérification et usage responsable.", "Ateliers de productivité, rédaction, organisation et automatisation.", "Plan d’action et accompagnement sur mesure."], evaluation: "Validation des acquis par les cas pratiques et le plan d’action construit avec l’équipe." }
];

export const shortFaq = [
  ["Les formations sont-elles adaptées à notre activité ?", "Oui. L’échange préalable permet de contextualiser les exemples, les risques et l’organisation de la session."],
  ["Peut-on organiser une session dans l’entreprise ?", "L’organisation est étudiée avec vous selon votre besoin, vos locaux et les participants."],
  ["La prestation IA est-elle une formation réglementaire ?", "Non. Elle est présentée comme une prestation d’accompagnement distincte des dispositifs SST et des formations réglementaires."],
];
