import { Inject, Injectable } from '@nestjs/common';
import { TableOptions } from './az-table.interface';
import { TABLE_OPTIONS } from './az-table.constants';
import { TableClient, AzureNamedKeyCredential, TableServiceClient, TableServiceClientOptions } from '@azure/data-tables';

@Injectable()
export class TableService {
  constructor(
    @Inject(TABLE_OPTIONS)
    private tablesOptions: TableOptions
  ) {}

  async checkTableExists(tableName: string, tableServiceClient: TableServiceClient): Promise<boolean> {
    const tables = tableServiceClient.listTables();
    let tableExists: boolean = false;

    for await (const table of tables) {
      if (table.name === tableName) {
        tableExists = true;

        break;
      }
    }

    return tableExists;
  }

  async getTableClient(tableName: string): Promise<TableClient> {
    try {
      const credential: AzureNamedKeyCredential = new AzureNamedKeyCredential(this.tablesOptions.accountName, this.tablesOptions.accountKey);
      const options: TableServiceClientOptions = { allowInsecureConnection: this.tablesOptions.allowInsecureConnection };
      const tableServiceClient: TableServiceClient = new TableServiceClient(this.tablesOptions.accountUrl, credential, options);
      const tableExists: boolean = await this.checkTableExists(tableName, tableServiceClient);

      if (!tableExists) {
        await tableServiceClient.createTable(tableName);
      }

      const tableClient: TableClient = new TableClient(this.tablesOptions.accountUrl, tableName, credential, options);

      return tableClient;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
}