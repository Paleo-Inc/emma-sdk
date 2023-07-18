import { FetcherOptions } from "./cross-fetcher";
import { AuthenticationEnum } from "./enum";
import { ValueType, fetchDefinition } from "./schema";

export type InputType = {
  key: string;
  type: ValueType;
  name: string;
  description: string;
  placeholder?: string;
};

export type FixedHeaderType = {
  key: string;
  value: string;
};

export interface DefaultAuthenticationType {
  type: AuthenticationEnum;
  authorizationUrl?: string | null;
  tokenUrl?: string | null;
  authorizationParams?: FixedHeaderType[] | undefined;
  tokenParams?: FixedHeaderType[] | undefined;
  scope?: string[] | null;
  generateCustomEndpoint?: fetchDefinition<InputType, string>;
  requireEndPoint?: boolean | null;
  manualEndPoint?: InputType | null;
  getConnectionName?: (context: ContextType) => Promise<string>;
  verifyCredentials?: (context: ContextType) => Promise<boolean>;
  instructionUrl?: string | undefined;
  customKey?: string;
  userInput?: InputType[];
  tokenPrefix?: string;
}

export type FetcherFunction<T> = (
  url: string,
  options?: FetcherOptions
) => Promise<T>;

export type ContextType = {
  fetcher: FetcherFunction<any>;
  endpoint?: string;
  [key: string]: any;
};
