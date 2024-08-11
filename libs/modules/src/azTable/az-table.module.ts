import { Module, DynamicModule } from '@nestjs/common';
import { TableService } from './az-table.service';
import { TableOptions } from './az-table.interface';
import { TABLE_OPTIONS } from './az-table.constants';

@Module({})
export class TablesModule {
  static register(options: TableOptions): DynamicModule {
    return {
      module: TablesModule,
      providers: [
        {
          provide: TABLE_OPTIONS,
          useValue: options
        },
        TablesModule
      ],
      exports: [TableService]
    }
  }
}