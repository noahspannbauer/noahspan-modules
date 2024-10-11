import { Inject, Injectable } from '@nestjs/common';
import { TableOptions } from './az-table.interface';
import { TABLE_OPTIONS } from './az-table.constants';
import { TableClient } from '@azure/data-tables';

@Injectable()
export class TableService {
  constructor(
    @Inject(TABLE_OPTIONS)
    private tablesOptions: TableOptions
  ) {}

  async getTableClient(tableName: string): Promise<TableClient> {
    const tableClient: TableClient = new TableClient(this.tablesOptions.connectionString, tableName);

    return tableClient;
  }
}