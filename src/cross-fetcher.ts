import fetch, { Request, Response } from "cross-fetch";
export type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

export type FetcherOptions = RequestInit & {
  // Additional custom options if needed
};

export async function fetcher<T>(
  url: string,
  options: FetcherOptions = {}
): Promise<T> {
  const { headers = {}, ...restOptions } = options;

  const mergedOptions: FetcherOptions = {
    headers: {
      // Default headers if needed
      "Content-Type": "application/json",
      ...headers,
    },
    ...restOptions,
  };

  const response: Response = await fetch(url, mergedOptions);

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  try {
    const data: T = await response.json();
    return data;
  } catch (error) {
    throw new Error("Failed to parse response as JSON");
  }
}

export default fetcher;
