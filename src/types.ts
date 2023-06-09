import { FetcherOptions } from "./cross-fetcher";
import { AuthenticationEnum } from "./enum";

export type AuthenticationType = {
  type: AuthenticationEnum;
  authorizationUrl?: string;
  authorizationUrlHeader?: FixedHeaderType[];
  tokenUrlHeader?: FixedHeaderType[];
  tokenUrl?: string;
  paramName?: string;
  getConnectionName: (fetcher: FetcherFunction<any>) => string;
  params?: InputType[];
  instructionUrl?: string;
  scope?: string[];
  customKey?: string;
};

export type InputType = {
  key: string;
  type: string;
  name: string;
  description: string;
  placeholder?: string;
};

export type FixedHeaderType = {
  key: string;
  value: string;
};

type FetcherFunction<T> = (url: string, options?: FetcherOptions) => Promise<T>;

export type executeFunctionType = (fetcher: FetcherFunction<any>) => void;
