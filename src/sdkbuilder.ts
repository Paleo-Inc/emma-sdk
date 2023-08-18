import { AuthenticationEnum } from "./enum";
import { fetcher, HttpMethod } from "./cross-fetcher";
import { DefaultAuthenticationType } from "./types";
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

  constructor() {
    this.defaultAuthentication = {
      type: AuthenticationEnum.NOAUTH,
    };
  }
  setAuthentication(data: DefaultAuthenticationType) {
    if (data.userInput && data.userInput.length > 0) {
      for (let i = 0; i < data.userInput.length; i++) {
        checkKeyName(data.userInput[i].key);
      }
    }
    if (data.type == AuthenticationEnum.OAuth2) {
      if (!data.tokenUrl || !data.authorizationUrl) {
        throw new Error("TokenUrl and AuthorizationUrl is required for OAuth2");
      }
    }
    if (
      data.requireEndPoint &&
      !data.manualEndPoint &&
      !data.generateCustomEndpoint
    ) {
      throw new Error(
        "Endpoint method(manualEndPoing/generateCustomEndpoint) is required when requireEndPoint is true"
      );
    }
    if (data.manualEndPoint && !data.requireEndPoint) {
      throw new Error(
        "Please set requireEndPoint to true when manualEndPoint is set"
      );
    }
    if (data.generateCustomEndpoint && !data.requireEndPoint) {
      throw new Error(
        "Please set requireEndPoint to true when generateCustomEndpoint is set"
      );
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
    schema,
    item_link,
    fetch,
  }: DataConnectionDefinition<K, T>) {
    // write code to validate schema
    if (fetch && fetch.userInput && fetch.userInput.length) {
      for (let i = 0; i < fetch.userInput.length; i++) {
        checkKeyName(fetch.userInput[i].key);
      }
    }
    // check for unique data connection name
    if (this.dataConnections && this.dataConnections.length) {
      for (let i = 0; i < this.dataConnections.length; i++) {
        if (this.dataConnections[i].name.toLowerCase() == name.toLowerCase()) {
          throw new Error(`Data connection name ${name} already exists`);
        }
      }
    }

    // check for no space and special character in name
    if (name && name.length) {
      if (name.match(/^[a-zA-Z0-9_]*$/)) {
        // valid name
      } else {
        throw new Error(
          "Data connection name should not contain space and special characters"
        );
      }
    }

    if (this.dataConnections && this.dataConnections.length) {
      this.dataConnections.push({
        name,
        description,
        identityName,
        item_link,
        schema,
        fetch,
      });
    } else {
      this.dataConnections = [
        {
          name,
          description,
          identityName,
          item_link,
          schema,
          fetch,
        },
      ];
    }
  }
}

export { AuthenticationEnum, HttpMethod };
