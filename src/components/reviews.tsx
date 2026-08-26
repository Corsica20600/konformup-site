import { getPublicReviews } from "@/lib/reviews";

export async function Reviews({ limit }: { limit?: number }) {
  const reviews = await getPublicReviews();
  const list = limit ? reviews.slice(0, limit) : reviews;

  if (!list.length) {
    return <div className="empty-state"><p className="eyebrow">Avis clients</p><h2>Les retours publiables arrivent bientôt.</h2><p>Seuls les avis ayant reçu un consentement explicite et une validation de publication sont présentés ici.</p></div>;
  }

  return <div className="review-grid">{list.map((review, index) => <article className="review" key={`${review.identity}-${index}`}><p aria-label={`${review.rating} étoiles sur 5`} className="stars">{"★".repeat(review.rating)}<span>{"★".repeat(5 - review.rating)}</span></p><p className="review-text">« {review.comment} »</p><div className="review-footer"><strong>{review.identity}</strong></div></article>)}</div>;
}
