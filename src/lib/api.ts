import { BaseApiResponse } from "@/types";
import { logger } from "./logger";

type FetchOptions = RequestInit & {
  params?: Record<string, string>;
};

export async function fetchApi<T>(
  endpoint: string,
  options: FetchOptions = {}
): Promise<BaseApiResponse<T>> {
  try {
    const { params, ...init } = options;
    const url = new URL(`${process.env.NEXT_PUBLIC_API_URL || ""}${endpoint}`);
    
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        url.searchParams.append(key, value);
      });
    }

    const response = await fetch(url.toString(), {
      ...init,
      headers: {
        "Content-Type": "application/json",
        ...init.headers,
      },
    });

    const data = await response.json().catch(() => null);

    if (!response.ok) {
      logger.error(`API Error: ${response.status}`, data);
      return {
        data: null,
        error: data?.message || "An error occurred",
        status: response.status,
      };
    }

    return {
      data,
      error: null,
      status: response.status,
    };
  } catch (error) {
    logger.error("Network Error", error);
    return {
      data: null,
      error: error instanceof Error ? error.message : "Network error",
      status: 500,
    };
  }
}
