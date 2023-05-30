import { AuthenticationEnum } from "./enum";

export type AuthenticationType = {
  type: AuthenticationEnum;
  authorizationUrl?: string;
  tokenUrl?: string;
  scope?: string[];
};
