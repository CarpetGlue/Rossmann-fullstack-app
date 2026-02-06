import type { Episode, PaginatedResponse } from "../types/episode";

const API_URL = import.meta.env.VITE_API_URL;

if (!API_URL) {
  throw new Error("VITE_API_URL is not defined");
}

export interface EpisodeQueryParams {
  page?: number;
  name?: string;
  date_from?: string;
  date_to?: string;
  sort?: string;
  direction?: "asc" | "desc";
}

export async function fetchEpisodes(
  params: EpisodeQueryParams
): Promise<PaginatedResponse<Episode>> {
  const query = new URLSearchParams(
    Object.entries(params).filter(([, v]) => v !== undefined) as string[][]
  );

  const response = await fetch(`${API_URL}?${query.toString()}`);

  if (!response.ok) {
    throw new Error("Failed to fetch episodes");
  }

  return response.json();
}