import { AuthenticationEnum } from "./enum";
import { AxiosFetcherOptions, AxiosFetcherResponse } from "./fetcher";

export type AuthenticationType = {
  type: AuthenticationEnum;
  authorizationUrl?: string;
  tokenUrl?: string;
  scope?: string[];
  customKey?: string;
};

export type InputType = {
  key: string;
  type: string;
};

export type AxiosFetcherFunction<T> = (
  options: AxiosFetcherOptions<T>
) => Promise<AxiosFetcherResponse<T>>;

export type executeFunctionType = (fetcher: AxiosFetcherFunction<any>) => void;
