import { PassportStrategy } from "@nestjs/passport";
import { Strategy, Profile } from 'passport-openidconnect';
import { MODULE_OPTIONS_TOKEN } from "./auth.module-definition";
import { AuthModuleOptions } from "./auth.interface";
import { Inject, Injectable } from "@nestjs/common";

@Injectable()
export class OidcStrategy extends PassportStrategy(Strategy, 'oidc') {
  constructor(@Inject(MODULE_OPTIONS_TOKEN) authModuleOptions: AuthModuleOptions) {
    super({
      authorizationURL: authModuleOptions.authorizationUrl,
      callbackURL: authModuleOptions.callbackUrl,
      clientID: authModuleOptions.clientId,
      clientSecret: authModuleOptions.clientSecret,
      issuer: authModuleOptions.issuer,
      scope: authModuleOptions.scope,
      tokenURL: authModuleOptions.tokenUrl,
      userInfoURL: authModuleOptions.userInfoUrl
    })
  }

  async validate(profile: Profile, done: Function): Promise<any> {
    const user = {
      id: profile.id,
      email: profile.emails,
      name: profile.displayName
    }

    done(null, user)
  }
}