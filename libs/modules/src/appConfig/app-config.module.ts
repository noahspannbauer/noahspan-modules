import { Module, DynamicModule } from '@nestjs/common';
import { AppConfigService } from './app-config.service';
import { AppConfigOptions } from './app-config.interface';
import { APP_CONFIG_OPTIONS } from './app-config.constants';

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
