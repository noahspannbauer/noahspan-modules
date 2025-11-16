import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import * as jwksRsa from 'jwks-rsa';
import { AuthModuleOptions } from './auth.interface';
import { MODULE_OPTIONS_TOKEN } from './auth.module-definition';

@Injectable()
export class AuthStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(@Inject(MODULE_OPTIONS_TOKEN) authModuleOptions: AuthModuleOptions) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      audience: authModuleOptions.audience,
      issuer: authModuleOptions.issuerUrl,
      algorithms: ['RS256'],
      ignoreExpiration: false,
      secretOrKeyProvider: jwksRsa.passportJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: authModuleOptions.jwksUri,
      }),
    });
  }

  validate(payload: any) {
    return payload;
  }
}