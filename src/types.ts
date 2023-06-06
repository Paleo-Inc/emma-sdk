import { AuthenticationEnum } from "./enum";
import { AxiosFetcherOptions, AxiosFetcherResponse } from "./fetcher";

export type AuthenticationType = {
  type: AuthenticationEnum;
  authorizationUrl?: string;
  authorizationUrlHeader?: FixedHeaderType[];
  tokenUrlHeader?: FixedHeaderType[];
  tokenUrl?: string;
  scope?: string[];
  customKey?: string;
};

export type InputType = {
  key: string;
  type: string;
};

export type FixedHeaderType = {
  key: string;
  value: string;
};

export type AxiosFetcherFunction<T> = (
  options: AxiosFetcherOptions<T>
) => Promise<AxiosFetcherResponse<T>>;

export type executeFunctionType = (fetcher: AxiosFetcherFunction<any>) => void;
