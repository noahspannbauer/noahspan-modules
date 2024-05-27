import { Module, DynamicModule } from '@nestjs/common';
import { AzAppConfigService } from './az-app-config.service';
import { AzAppConfigOptions } from './az-app-config.interface';
import { AZ_APP_CONFIG_OPTIONS } from './az-app-config.constants';

@Module({})
export class AzAppConfigModule {
  static register(options: AzAppConfigOptions): DynamicModule {
    return {
      module: AzAppConfigModule,
      providers: [
        {
          provide: AZ_APP_CONFIG_OPTIONS,
          useValue: options,
        },
        AzAppConfigService,
      ],
      exports: [AzAppConfigService],
    };
  }
}
