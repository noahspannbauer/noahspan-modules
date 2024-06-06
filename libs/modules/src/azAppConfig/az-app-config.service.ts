import { Inject, Injectable } from '@nestjs/common';
import { AppConfigOptions } from './az-app-config.interface';
import { APP_CONFIG_OPTIONS } from './az-app-config.constants';
import axios, { AxiosResponse } from 'axios';
import { AppConfigurationClient, ConfigurationSetting, FeatureFlagValue, GetConfigurationSettingResponse, featureFlagPrefix, isFeatureFlag, parseFeatureFlag } from '@azure/app-configuration';
import { ClientSecretCredential } from '@azure/identity';

@Injectable()
export class AppConfigService {
  constructor(
    @Inject(APP_CONFIG_OPTIONS)
    private appConfigOptions: AppConfigOptions
  ) { }

  async getFeatureFlags(keys: string[], label: string): Promise<{ key: string, enabled: boolean }[]> {
    const credential: ClientSecretCredential = new ClientSecretCredential(this.appConfigOptions.tenantId, this.appConfigOptions.clientId, this.appConfigOptions.clientSecret);
    const client: AppConfigurationClient = new AppConfigurationClient(this.appConfigOptions.url, credential);
    const featureFlags: { key: string, enabled: boolean }[] = await Promise.all(
      keys.map(async (key: string) => {
        const configSetting: GetConfigurationSettingResponse = await client.getConfigurationSetting({
          key: `${featureFlagPrefix}${key}`,
          label: label
        });

        if (isFeatureFlag(configSetting)) {
          const parsedFeatureFlag: ConfigurationSetting<FeatureFlagValue> = parseFeatureFlag(configSetting);

          return {
            key: parsedFeatureFlag.value.id,
            enabled: parsedFeatureFlag.value.enabled
          }
        }
      })
    );

    return featureFlags;
  }
}
