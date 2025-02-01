import { Inject, Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { AuthModuleOptions } from './auth.interface'
import { MODULE_OPTIONS_TOKEN } from "./auth.module-definition";
import { BearerStrategy } from 'passport-azure-ad'
import { ExtractJwt, Strategy } from 'passport-jwt';
import * as jwksRsa from 'jwks-rsa';

@Injectable()
export class AzureAdStrategy extends PassportStrategy(
    BearerStrategy,
    'azure-ad'
) {
    constructor(@Inject(MODULE_OPTIONS_TOKEN) authModuleOptions: AuthModuleOptions) {
        console.log(authModuleOptions)
        super({
            identityMetadata: `https://login.microsoftonline.com/${authModuleOptions.tenantId}/.well-known/openid-configuration`,
            clientID: authModuleOptions.clientId,
            audience: `api://${authModuleOptions.clientId}`,
            loggingLevel: 'info',
            loggingNoPII: false
        })
    }

    async validate(data: any): Promise<any> {
        return data;
    }
}

// @Injectable()
// export class AzureAdStrategy extends PassportStrategy(Strategy, 'azure-ad') {
//     constructor(@Inject(MODULE_OPTIONS_TOKEN) authModuleOptions: AuthModuleOptions) {
//         super({
//             jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//             audience: `api://${authModuleOptions.clientId}`,
//             issuer: `https://sts.windows.net/${authModuleOptions.tenantId}`,
//             algorithms: ['RS256'],
//             ignoreExpiration: true,
//             secretOrKeyProvider: jwksRsa.passportJwtSecret({
//                 cache: true,
//                 rateLimit: true,
//                 jwksRequestsPerMinute: 5,
//                 jwksUri: `https://login.microsoftonline.com/${authModuleOptions.tenantId}`
//             })
//         })
//     } 

//     validate(payload: any) {
//         return payload;
//     }
// }