import { Module, DynamicModule } from '@nestjs/common';
import { MsGraphService } from './ms-graph.service';
import { MsGraphOptions } from './ms-graph.interface';
import { MS_GRAPH_OPTIONS } from './ms-graph.constants';

@Module({})
export class MsGraphModule {
    static register(options: MsGraphOptions): DynamicModule {
        return {
            module: MsGraphModule,
            providers: [
                {
                    provide: MS_GRAPH_OPTIONS,
                    useValue: options
                },
                MsGraphService
            ],
            exports: [MsGraphService]
        }
    }
}