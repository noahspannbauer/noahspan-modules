import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { ConfigurableModuleClass } from './user.module-definition';
import { UserController } from './user.controller';

@Module({
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule extends ConfigurableModuleClass {}