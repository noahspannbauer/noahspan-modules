import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthStrategy } from './auth.strategy';
import { ConfigurableModuleClass } from './auth.module-definition';

@Module({
  imports: [
    PassportModule.register({
      defaultStrategy: 'jwt'
    })
  ],
  providers: [
    AuthStrategy
  ]
})
export class AuthModule extends ConfigurableModuleClass {}
