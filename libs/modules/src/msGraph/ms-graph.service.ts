import { Inject, Injectable } from '@nestjs/common';
import { MsGraphOptions } from './ms-graph.interface';
import { MS_GRAPH_OPTIONS } from './ms-graph.constants';
import { ClientSecretCredential } from '@azure/identity';
import { Client } from '@microsoft/microsoft-graph-client';
import { TokenCredentialAuthenticationProvider } from '@microsoft/microsoft-graph-client/authProviders/azureTokenCredentials'

@Injectable()
export class MsGraphService {
    constructor(@Inject(MS_GRAPH_OPTIONS) private msGraphOptions: MsGraphOptions) {}

    async getMsGraphClient(): Promise<Client> {
        const credential = new ClientSecretCredential(this.msGraphOptions.tenantId, this.msGraphOptions.clientId, this.msGraphOptions.clientSecret);
        const authProvider = new TokenCredentialAuthenticationProvider(credential, { scopes: ['.default'] });
        const client = Client.initWithMiddleware({
            debugLogging: true,
            authProvider
        });

        return client;
    }
}