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

  constructor() {
    this.defaultAuthentication = {
      type: AuthenticationEnum.HEADERBEARER,
    };
  }
  setAuthentication(data: DefaultAuthenticationType) {
    this.defaultAuthentication = data;
  }

  addDataConnection(execute: executeFunctionType) {
    //
  }
}

export { AuthenticationEnum, HttpMethod };
