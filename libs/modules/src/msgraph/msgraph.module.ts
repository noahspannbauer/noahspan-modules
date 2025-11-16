import { Module } from '@nestjs/common';
import { MsGraphService } from './msgraph.service';
import { ConfigurableModuleClass } from './msgraph.module-definition';
import { MsGraphController } from './msgraph.controller';

@Module({
  controllers: [MsGraphController],
  providers: [MsGraphService],
  exports: [MsGraphService]
})
export class MsGraphModule extends ConfigurableModuleClass {}