import "server-only";

export type PublicTrainingSession = {
  id: string;
  trainingType: "sst_initial" | "mac_sst" | "hygiene" | "ai";
  label: string;
  startDate: string;
  endDate: string;
  location: string;
};

export async function getPublicTrainingSessions(): Promise<PublicTrainingSession[]> {
  const url = process.env.PUBLIC_SESSIONS_API_URL?.trim();
  const token = process.env.REVIEWS_API_TOKEN?.trim();
  if (!url || !token) return [];

  try {
    const response = await fetch(url, {
      headers: { authorization: `Bearer ${token}` },
      next: { revalidate: 300 }
    });
    if (!response.ok) return [];
    const data: unknown = await response.json();
    if (!Array.isArray(data)) return [];

    return data.flatMap((entry): PublicTrainingSession[] => {
      if (!entry || typeof entry !== "object") return [];
      const item = entry as Record<string, unknown>;
      if (
        typeof item.id !== "string" ||
        !["sst_initial", "mac_sst", "hygiene", "ai"].includes(String(item.trainingType)) ||
        typeof item.label !== "string" ||
        typeof item.startDate !== "string" ||
        typeof item.endDate !== "string" ||
        typeof item.location !== "string"
      ) return [];
      return [{
        id: item.id,
        trainingType: item.trainingType as PublicTrainingSession["trainingType"],
        label: item.label,
        startDate: item.startDate,
        endDate: item.endDate,
        location: item.location
      }];
    });
  } catch {
    return [];
  }
}
