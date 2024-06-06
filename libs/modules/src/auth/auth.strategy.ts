import { Inject, Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { BearerStrategy } from 'passport-azure-ad';
import { AuthOptions } from './auth.interface'
import { AUTH_OPTIONS } from "./auth.constants";

@Injectable()
export class AzureAdStrategy extends PassportStrategy(
    BearerStrategy,
    'azure-ad'
) {
    constructor(@Inject(AUTH_OPTIONS) authOptions: AuthOptions) {
        super({
            identityMetadata: `https://login.microsoftonline.com/${authOptions.tenantId}/v2.0/.well-known/openid-configuration`,
            clientID: authOptions.clientId,
            loggingLevel: 'info',
            loggingNoPII: false
        })
    }

    async validate(data: any): Promise<any> {
        return data;
    }
}