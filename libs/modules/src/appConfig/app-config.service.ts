import { Inject, Injectable } from '@nestjs/common';
import { AppConfigOptions } from './app-config.interface';
import { APP_CONFIG_OPTIONS } from './app-config.constants';
import axios, { AxiosResponse } from 'axios';
import { FeatureFlagValue } from '@azure/app-configuration';

@Injectable()
export class AppConfigService {
  constructor(
    @Inject(APP_CONFIG_OPTIONS)
    private appConfigOptions: AppConfigOptions
  ) { }

  async getFeatureFlags(token: string, key: string, label: string): Promise<FeatureFlagValue[]> {
    try {
      const response: AxiosResponse = await axios.get(
        `${this.appConfigOptions.url}/kv?key=.appconfig.featureflag/${key}&label=${label}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      const featureFlags: FeatureFlagValue[] = response.data.items.map((item) => item.value)

      return featureFlags;
    } catch (error) {
      return error;
    }
  }
}
