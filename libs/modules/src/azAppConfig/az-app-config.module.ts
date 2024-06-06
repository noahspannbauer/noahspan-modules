import { Module, DynamicModule } from '@nestjs/common';
import { AppConfigService } from './az-app-config.service';
import { AppConfigOptions } from './az-app-config.interface';
import { APP_CONFIG_OPTIONS } from './az-app-config.constants';

@Module({})
export class AppConfigModule {
  static register(options: AppConfigOptions): DynamicModule {
    return {
      module: AppConfigModule,
      providers: [
        {
          provide: APP_CONFIG_OPTIONS,
          useValue: options
        },
        AppConfigService
      ],
      exports: [AppConfigService]
    };
  }
}
