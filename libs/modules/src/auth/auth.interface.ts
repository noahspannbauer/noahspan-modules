export interface AuthModuleOptions {
  authorizationUrl: string;
  issuer: string;
  callbackUrl: string;
  clientId: string;
  clientSecret: string;
  scope: string;
  tokenUrl: string;
  userInfoUrl: string;
}
