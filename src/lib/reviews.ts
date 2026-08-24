import "server-only";

export type PublicReview = { rating: number; comment: string; identity: string; publishedAt?: string };

/** Reads only a dedicated, server-authenticated public projection. Never query internal tables from this project. */
export async function getPublicReviews(): Promise<PublicReview[]> {
  const endpoint = process.env.REVIEWS_API_URL;
  const token = process.env.REVIEWS_API_TOKEN;
  if (!endpoint || !token) return [];
  try {
    const response = await fetch(endpoint, { headers: { Authorization: `Bearer ${token}` }, next: { revalidate: 3600 } });
    if (!response.ok) return [];
    const data: unknown = await response.json();
    if (!Array.isArray(data)) return [];
    return data.filter((item): item is PublicReview => Boolean(item && typeof item === "object" && typeof (item as PublicReview).comment === "string" && typeof (item as PublicReview).identity === "string" && Number.isInteger((item as PublicReview).rating) && (item as PublicReview).rating >= 1 && (item as PublicReview).rating <= 5));
  } catch { return []; }
}
