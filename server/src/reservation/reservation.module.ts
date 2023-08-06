import {
  CacheModule,
  MiddlewareConsumer,
  Module,
  RequestMethod,
} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonModule } from '../../src/common/common.module';
// import { ReservationExistsMiddleware } from './reservation-exists.middleware';
import { ReservationController } from './reservation.controller';
import { ReservationService } from './reservation.service';
import { Reservation } from './reservation.entity';
import { MovieShow } from '../../src/movie-show/movie-show.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Reservation, MovieShow]),
    CacheModule.register(),
    CommonModule,
  ],
  controllers: [ReservationController],
  providers: [ReservationService],
})
export class ReservationModule {
  //   configure(consumer: MiddlewareConsumer) {
  //     consumer
  //       .apply(ReservationExistsMiddleware)
  //       .forRoutes(
  //         { path: 'reservations/:id', method: RequestMethod.PUT },
  //         { path: 'reservations/:id', method: RequestMethod.DELETE },
  //       );
  //   }
}
