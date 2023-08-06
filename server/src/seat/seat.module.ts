import {
  CacheModule,
  MiddlewareConsumer,
  Module,
  RequestMethod,
} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonModule } from '../../src/common/common.module';
import { SeatExistsMiddleware } from './seat-exists.middleware';
import { SeatController } from './seat.controller';
import { SeatService } from './seat.service';
import { Seat } from './seat.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Seat]),
    CacheModule.register(),
    CommonModule,
  ],
  controllers: [SeatController],
  providers: [SeatService],
})
export class SeatModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(SeatExistsMiddleware)
      .forRoutes(
        { path: 'seats/:id', method: RequestMethod.PUT },
        { path: 'seats/:id', method: RequestMethod.DELETE },
      );
  }
}
