import { AuthenticationEnum } from "./enum";
import { fetcher, HttpMethod } from "./cross-fetcher";
import {
  DefaultAuthenticationType,
  FixedHeaderType,
  InputType,
  executeFunctionType,
} from "./types";
import { DataConnectionDefinition, fetchDefinition } from "./schema";

export function newIntegration() {
  return new EmmaSdk();
}

class EmmaSdk {
  defaultAuthentication?: DefaultAuthenticationType;
  networkDomain?: string;

  dataConnections?: DataConnectionDefinition<string, any>[];

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

  addDataConnection<K extends string, T extends string>({
    name,
    description,
    identityName,
    schema,
    fetch,
  }: DataConnectionDefinition<K, T>) {
    // write code to validate schema
    if (this.dataConnections && this.dataConnections.length) {
      this.dataConnections.push({
        name,
        description,
        identityName,
        schema,
        fetch,
      });
    } else {
      this.dataConnections = [
        {
          name,
          description,
          identityName,
          schema,
          fetch,
        },
      ];
    }
  }
}

export { AuthenticationEnum, HttpMethod };
