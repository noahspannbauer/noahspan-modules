import { Module, DynamicModule } from '@nestjs/common';
import { AuthOptions } from './auth.interface';
import { AUTH_OPTIONS } from './auth.constants';
import { PassportModule } from '@nestjs/passport';
import { AzureAdStrategy } from './auth.strategy';

@Module({})
export class AuthModule {
  static register(options: AuthOptions): DynamicModule {
    return {
      module: AuthModule,
      imports: [
        PassportModule.register({
          defaultStrategy: 'azure-ad'
        })
      ],
      providers: [
        {
          provide: AUTH_OPTIONS,
          useValue: options
        },
        AzureAdStrategy
      ]
    };
  }
}
