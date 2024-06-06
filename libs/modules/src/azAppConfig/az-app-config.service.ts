import { Inject, Injectable } from '@nestjs/common';
import { AppConfigOptions } from './az-app-config.interface';
import { APP_CONFIG_OPTIONS } from './az-app-config.constants';
import axios, { AxiosResponse } from 'axios';
import { FeatureFlagValue } from '@azure/app-configuration';

@Injectable()
export class AppConfigService {
  constructor(
    @Inject(APP_CONFIG_OPTIONS)
    private appConfigOptions: AppConfigOptions
  ) { }

  async getToken(): Promise<string> {
    try {
      const { data }: AxiosResponse = await axios.post(
        `https://login.microsoftonline.com/${this.appConfigOptions.tenantId}/oauth2/token`,
        {
          grant_type: 'client_credentials',
          client_id: this.appConfigOptions.clientId,
          client_secret: this.appConfigOptions.clientSecret,
          resource: 'https://azconfig.io'
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

  async getFeatureFlags(token: string, key: string, label: string): Promise<FeatureFlagValue[]> {
    try {
      const token: string = await this.getToken();
      const response: AxiosResponse = await axios.get(
        `${this.appConfigOptions.url}/kv?key=.appconfig.featureflag/${key}&label=${label}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      const featureFlags: FeatureFlagValue[] = response.data.items.map((item) => JSON.parse(item.value));

      return featureFlags;
    } catch (error) {
      return error;
    }
  }
}
