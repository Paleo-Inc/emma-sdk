import { AuthenticationEnum } from "./enum";
import { fetcher, HttpMethod } from "./cross-fetcher";
import {
  AuthenticationType,
  FixedHeaderType,
  InputType,
  executeFunctionType,
} from "./types";

export function newIntegration() {
  return new EmmaSdk();
}

class EmmaSdk {
  authenticationType: AuthenticationEnum;
  authorizationUrl?: string | null;
  tokenUrl?: string | null;
  authorizationParams: FixedHeaderType[] | undefined;
  tokenParams: FixedHeaderType[] | undefined;
  scope?: string[] | null;
  instructionUrl?: string | undefined;
  customKey?: string;
  userInput?: InputType[];
  [key: string]: any;

  constructor() {
    this.authenticationType = AuthenticationEnum.HEADERBEARER;
  }
  setAuthentication(data: AuthenticationType) {
    this.authenticationType = data.type;
    if (data.authorizationUrl) {
      this.authorizationUrl = data.authorizationUrl;
    }
    if (data.tokenUrl) {
      this.tokenUrl = data.tokenUrl;
    }
    if (data.customKey) {
      this.customKey = data.customKey;
    }
    if (data.authorizationUrlHeader) {
      this.authorizationUrlHeader = data.authorizationUrlHeader;
    }
    if (data.tokenUrlHeader) {
      this.tokenUrlHeader = data.tokenUrlHeader;
    }
    if (data.scope) {
      this.scope = data.scope;
    }
  }

  addDataConnection(execute: executeFunctionType) {
    let inputValues: any = {};
    let isInputEmpty = false;
    for (let key in this.userInput) {
      if (this[key] !== "") {
        inputValues[key] = this[key];
      } else {
        isInputEmpty = true;
        break;
      }
    }
    if (isInputEmpty) {
      return {
        status: false,
        message: "User input is empty",
      };
    }
    this.executionFunction = execute;
  }
}

export { AuthenticationEnum, HttpMethod };
