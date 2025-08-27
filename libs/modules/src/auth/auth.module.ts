import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { OidcStrategy } from './oidc.strategy';
import { ConfigurableModuleClass } from './auth.module-definition';

@Module({
  imports: [
    PassportModule.register({
      defaultStrategy: 'oidc'
    })
  ],
  providers: [
    OidcStrategy
  ]
})
export class AuthModule extends ConfigurableModuleClass {}
