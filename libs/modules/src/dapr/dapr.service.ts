import { Injectable, Logger } from '@nestjs/common';
import { DaprClient } from '@dapr/dapr';

@Injectable()
export class DaprService {
  daprClient: DaprClient;
  private readonly logger = new Logger(DaprService.name);

  constructor() {
    this.logger.log('Initializing DaprClient')
    this.daprClient = new DaprClient();
  }
}
