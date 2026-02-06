export interface Episode {
  id: number;
  name: string;
  air_date: string | null;
  episode_code: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
}