import { Inject, Injectable } from '@nestjs/common';
import { TableOptions } from './az-table.interface';
import { TABLE_OPTIONS } from './az-table.constants';
import { TableClient, AzureNamedKeyCredential } from '@azure/data-tables';

@Injectable()
export class TableService {
  constructor(
    @Inject(TABLE_OPTIONS)
    private tablesOptions: TableOptions
  ) {}

  async getTableClient(tableName: string): Promise<TableClient> {
    const credential: AzureNamedKeyCredential = new AzureNamedKeyCredential(this.tablesOptions.accountName, this.tablesOptions.accountKey);
    const tableClient: TableClient = new TableClient(`https://${this.tablesOptions.accountName}.table.core.windows.net`, tableName, credential);

    return tableClient;
  }
}