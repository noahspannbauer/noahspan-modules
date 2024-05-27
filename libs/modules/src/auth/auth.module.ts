import { Module, DynamicModule } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthOptions } from './auth.interface';
import { AUTH_OPTIONS } from './auth.constants';

@Module({})
export class AuthModule {
  static register(options: AuthOptions): DynamicModule {
    return {
      module: AuthModule,
      providers: [
        {
          provide: AUTH_OPTIONS,
          useValue: options
        },
        AuthService
      ],
      exports: [AuthService]
    };
  }
}
