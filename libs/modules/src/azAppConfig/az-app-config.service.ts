import { Inject, Injectable } from '@nestjs/common';
import { AzAppConfigOptions } from './az-app-config.interface';
import { FeatureFlag } from './feature-flag.interface';
import { AppConfigurationClient } from '@azure/app-configuration';
import { AZ_APP_CONFIG_OPTIONS } from './az-app-config.constants';

@Injectable()
export class AzAppConfigService {
  constructor(
    @Inject(AZ_APP_CONFIG_OPTIONS)
    private azAppConfigOptions: AzAppConfigOptions,
  ) { }

  async getFeatureFlag(key: string, label: string): Promise<FeatureFlag> {
    try {
      const client = new AppConfigurationClient(
        this.azAppConfigOptions.connectionString,
      );
      const configurationSetting = await client.getConfigurationSetting({
        key: key,
        label: label,
      });
      const featureFlag: FeatureFlag = {
        name: configurationSetting.key,
        environment: configurationSetting.label,
        active: configurationSetting.value,
      };

      return featureFlag;
    } catch (error) {
      return error;
    }
  }
}
