import { Inject, Injectable } from '@nestjs/common';
import { AuthOptions } from './auth.interface';
import { AUTH_OPTIONS } from './auth.constants';
import axios, { AxiosResponse } from 'axios';

@Injectable()
export class AuthService {
  constructor(
    @Inject(AUTH_OPTIONS)
    private authOptions: AuthOptions
  ) { }

  async getToken(
    grantType: string,
    clientId: string,
    clientSecret: string,
    resource: string
  ): Promise<string> {
    try {

      const { data }: AxiosResponse = await axios.post(
        `https://login.microsoftonline.com/${this.authOptions.tenantId}/oauth2/token`,
        {
          grant_type: grantType,
          client_id: clientId,
          client_secret: clientSecret,
          resource: resource
        },
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }
      );

      return data.access_token;
    } catch (error) {
      return error;
    }
  }
}
