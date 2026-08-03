export interface ImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  blurDataURL?: string;
}

export interface BaseApiResponse<T = unknown> {
  data: T | null;
  error: string | null;
  status: number;
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface PaginatedResponse<T> extends BaseApiResponse<T> {
  meta?: PaginationMeta;
}
