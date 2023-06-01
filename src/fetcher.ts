import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

export type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";
export type AxiosFetcherOptions<T> = AxiosRequestConfig & {
  method: HttpMethod;
};

export type AxiosFetcherResponse<T> = AxiosResponse<T>;

export async function fetcher<T>(
  options: AxiosFetcherOptions<T>
): Promise<AxiosFetcherResponse<T>> {
  return axios(options);
}
