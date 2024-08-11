import { Module, DynamicModule } from '@nestjs/common';
import { TableService } from './az-table.service';
import { TableOptions } from './az-table.interface';
import { TABLE_OPTIONS } from './az-table.constants';

@Module({})
export class TableModule {
  static register(options: TableOptions): DynamicModule {
    return {
      module: TableModule,
      providers: [
        {
          provide: TABLE_OPTIONS,
          useValue: options
        },
        TableModule
      ],
      exports: [TableService]
    }
  }
}