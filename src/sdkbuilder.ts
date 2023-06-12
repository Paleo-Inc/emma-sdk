import { AuthenticationEnum } from "./enum";
import { fetcher, HttpMethod } from "./cross-fetcher";
import {
  DefaultAuthenticationType,
  FixedHeaderType,
  InputType,
  executeFunctionType,
} from "./types";

export function newIntegration() {
  return new EmmaSdk();
}

class EmmaSdk {
  defaultAuthentication?: DefaultAuthenticationType;
  networkDomain?: string;
  constructor() {
    this.defaultAuthentication = {
      type: AuthenticationEnum.HEADERBEARER,
    };
  }
  setAuthentication(data: DefaultAuthenticationType) {
    this.defaultAuthentication = data;
  }

  addNetworkDomain(domain: string): this {
    this.networkDomain = domain;
    return this;
  }

  addDataConnection(execute: executeFunctionType) {
    //
  }
}

export { AuthenticationEnum, HttpMethod };
