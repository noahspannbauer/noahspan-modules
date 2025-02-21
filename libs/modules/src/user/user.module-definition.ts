import { ConfigurableModuleBuilder } from '@nestjs/common';
import { UserModuleOptions } from './user.interface';

export const { ConfigurableModuleClass, ASYNC_OPTIONS_TYPE, MODULE_OPTIONS_TOKEN, OPTIONS_TYPE } = new ConfigurableModuleBuilder<UserModuleOptions>().build()