import { ConfigurableModuleBuilder } from '@nestjs/common';
import { MsGraphModuleOptions } from './msgraph.interface';

export const { ConfigurableModuleClass, ASYNC_OPTIONS_TYPE, MODULE_OPTIONS_TOKEN, OPTIONS_TYPE } = new ConfigurableModuleBuilder<MsGraphModuleOptions>().build()