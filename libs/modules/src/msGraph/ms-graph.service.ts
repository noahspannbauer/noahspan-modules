import { Inject, Injectable } from '@nestjs/common';
import { MsGraphOptions } from './ms-graph.interface';
import { MS_GRAPH_OPTIONS } from './ms-graph.constants';
import { Client } from '@microsoft/microsoft-graph-client';
import { AuthenticationResult, ConfidentialClientApplication, OnBehalfOfRequest } from '@azure/msal-node';

@Injectable()
export class MsGraphService {
    constructor(@Inject(MS_GRAPH_OPTIONS) private msGraphOptions: MsGraphOptions) {}

    async getMsGraphAuth(accessToken: string, scopes: string[]): Promise<string> {
        try {
            const oboRequest: OnBehalfOfRequest = {
                oboAssertion: accessToken,
                scopes: scopes
            }
            const cca = new ConfidentialClientApplication({
                auth: {
                    clientId: this.msGraphOptions.clientId,
                    clientSecret: this.msGraphOptions.clientSecret,
                    authority: `https://login.microsoftonline.com/${this.msGraphOptions.tenantId}`
                }
            });
            const authenticationResult: AuthenticationResult = await cca.acquireTokenOnBehalfOf(oboRequest);

            return authenticationResult.accessToken
        } catch (error) {
            return error
        }  
    }

    async getMsGraphClientDelegated(accessToken): Promise<Client> {
        const client = await Client.init({
            authProvider: (done) => {
                done(null, accessToken);
            }
        });

        return client;
    }
}