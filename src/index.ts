import { AuthenticationEnum } from "./enum";
import { fetcher, HttpMethod } from "./fetcher";
import { AuthenticationType, InputType, executeFunctionType } from "./types";

export default class EmmaSdk {
  authenticationType: AuthenticationEnum;
  authorizationUrl?: string | null;
  tokenUrl?: string | null;
  scope?: string[] | null;
  userInput?: InputType[];
  [key: string]: any;

  constructor() {
    this.authenticationType = AuthenticationEnum.HEADERBEARER;
  }
  setauthenticationType(data: AuthenticationType) {
    this.authenticationType = data.type;
    if (data.authorizationUrl) {
      this.authorizationUrl = data.authorizationUrl;
    }
    if (data.tokenUrl) {
      this.tokenUrl = data.tokenUrl;
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
        message: "User input are empty",
      };
    }
    this.executionFunction = execute;
  }

  async runFunction() {
    if (this.executionFunction) {
      let inputValues: any = {};
      for (let key in this.userInput) {
        if (this[key] !== "") {
          inputValues[key] = this[key];
        }
      }
      const returnValue = await this.executionFunction(fetcher);
      return returnValue;
    }
    return "No Values";
  }
}

export { AuthenticationEnum, HttpMethod };
