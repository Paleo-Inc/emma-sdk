import { AuthenticationEnum } from "./enum";
import { fetcher, HttpMethod } from "./cross-fetcher";
import {
  DefaultAuthenticationType,
  FixedHeaderType,
  InputType,
  executeFunctionType,
} from "./types";
import {
  checkKeyName,
  DataConnectionDefinition,
  fetchDefinition,
} from "./schema";

export function newIntegration() {
  return new EmmaSdk();
}

class EmmaSdk {
  defaultAuthentication?: DefaultAuthenticationType;
  networkDomain?: string;

  dataConnections?: DataConnectionDefinition<string, any>[];

  constructor() {}
  setAuthentication(data: DefaultAuthenticationType) {
    if (data.userInput && data.userInput.length > 0) {
      for (let i = 0; i < data.userInput.length; i++) {
        checkKeyName(data.userInput[i].key);
      }
    }
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
    identityTitle,
    schema,
    fetch,
  }: DataConnectionDefinition<K, T>) {
    // write code to validate schema
    if (fetch && fetch.parameters && fetch.parameters.length) {
      for (let i = 0; i < fetch.parameters.length; i++) {
        checkKeyName(fetch.parameters[i].key);
      }
    }
    if (this.dataConnections && this.dataConnections.length) {
      this.dataConnections.push({
        name,
        description,
        identityName,
        identityTitle,
        schema,
        fetch,
      });
    } else {
      this.dataConnections = [
        {
          name,
          description,
          identityName,
          identityTitle,
          schema,
          fetch,
        },
      ];
    }
  }
}

export { AuthenticationEnum, HttpMethod };
