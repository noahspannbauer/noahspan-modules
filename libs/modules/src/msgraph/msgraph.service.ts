import { Inject, Injectable, StreamableFile } from '@nestjs/common';
import { MsGraphModuleOptions } from './msgraph.interface';
import { Client } from '@microsoft/microsoft-graph-client';
import { AuthenticationResult, ConfidentialClientApplication, OnBehalfOfRequest } from '@azure/msal-node';
import { MODULE_OPTIONS_TOKEN } from './msgraph.module-definition';

@Injectable()
export class MsGraphService {
    constructor(@Inject(MODULE_OPTIONS_TOKEN) private msGraphModuleOptions: MsGraphModuleOptions) {}

    async getMsGraphAuth(accessToken: string, scopes: string[]): Promise<string> {
        try {
            const oboRequest: OnBehalfOfRequest = {
                oboAssertion: accessToken,
                scopes: scopes
            }
            const cca = new ConfidentialClientApplication({
                auth: {
                    clientId: this.msGraphModuleOptions.clientId,
                    clientSecret: this.msGraphModuleOptions.clientSecret,
                    authority: `https://login.microsoftonline.com/${this.msGraphModuleOptions.tenantId}`
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

    async getProfilePhoto(accessToken: string, scopes: string[]): Promise<Buffer> {
        try {
            const graphToken: string = await this.getMsGraphAuth(accessToken, scopes);
            const client: Client = await this.getMsGraphClientDelegated(graphToken);
            const blob: Blob = await client.api(`me/photos('48x48)/$value`).get();
            const arrayBuffer: ArrayBuffer = await blob.arrayBuffer();
            const buffer: Buffer = Buffer.from(arrayBuffer);

            return buffer;
        } catch (error) {
            return error;
        }
    }

    async getUserProfile(accessToken): Promise<any> {
        try {
            const graphToken: string = await this.getMsGraphAuth(accessToken, ['user.read']);
            const client: Client = await this.getMsGraphClientDelegated(graphToken);
            const userProfile = await client.api(`me`).get();

            return userProfile
        } catch (error) {
            return error;
        }
    }

    async searchUsers(accessToken, searchText: string): Promise<any> {
        try {
            const graphToken: string = await this.getMsGraphAuth(accessToken, ['user.read']);
            const client: Client = await this.getMsGraphClientDelegated(graphToken);
            const results: any = await client
                .api('users')
                .header('ConsistencyLevel', 'eventual')
                .search(`"displayName:${searchText}"`)
                .orderby('displayName')
                .select(['displayName', 'userPrincipalName'])
                .get();
            let personResults: any[];

            if (results.value) {
                personResults = results.value.filter((result: any) => {
                    if (result.userPrincipalName !== null) {
                        return result;
                    }
                });
            } else {
                personResults = []
            }

            return personResults;
        } catch (error) {
            throw new Error(error);
        }
    }
}