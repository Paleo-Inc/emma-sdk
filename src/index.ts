import { AuthenticationEnum } from "./enum";
import { fetcher, HttpMethod } from "./fetcher";
import {
  AuthenticationType,
  FixedHeaderType,
  InputType,
  executeFunctionType,
} from "./types";

export default class EmmaSdk {
  authenticationType: AuthenticationEnum;
  authorizationUrl?: string | null;
  tokenUrl?: string | null;
  authorizationUrlHeader: FixedHeaderType[] | undefined;
  tokenUrlHeader: FixedHeaderType[] | undefined;
  scope?: string[] | null;
  customKey?: string;
  userInput?: InputType[];
  [key: string]: any;

  constructor() {
    this.authenticationType = AuthenticationEnum.HEADERBEARER;
  }
  setAuthenticationType(data: AuthenticationType) {
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

  setInputType(inputs: InputType[]) {
    for (let i = 0; i < inputs.length; i++) {
      this[inputs[i].key] = "";
    }
    this.userInput = inputs;
  }

  setInputValue(key: string, value: string) {
    this[key] = value;
  }

  getInputValues() {
    let inputValues: any = {};
    for (let key in this) {
      if (typeof this[key] !== "function") {
        inputValues[key] = this[key];
      }
    }
    return inputValues;
  }

  addExecution(execute: executeFunctionType) {
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

  getHeaders() {
    let headers: any = {};
    if (this.authenticationType === AuthenticationEnum.HEADERBEARER) {
      headers = {
        Authorization: `Bearer ${this.token}`,
      };
    } else if (
      this.authenticationType == AuthenticationEnum.CUSTOMHEADER &&
      this.customKey
    ) {
      headers = {
        [this.customKey]: this.token,
      };
    }
    return headers;
  }

  async runFunction() {
    if (this.executionFunction) {
      let inputValues: any = {};
      for (let key in this.userInput) {
        if (this[key] !== "") {
          inputValues[key] = this[key];
        }
      }
      const runFetcher = async (options: any) => {
        const authHeader = this.getHeaders();
        options.headers = { ...options.headers, ...authHeader };
        return fetcher(options);
      };
      const returnValue = await this.executionFunction(runFetcher);
      return returnValue;
    }
    return "No Values";
  }
}

export { AuthenticationEnum, HttpMethod };
