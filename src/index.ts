import { AuthenticationEnum } from "./enum";
import { AuthenticationType } from "./types";

export default class EmmaSdk {
  authenticationType: AuthenticationEnum;
  authorizationUrl?: string | null;
  tokenUrl?: string | null;
  scope?: string[] | null;

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
}
