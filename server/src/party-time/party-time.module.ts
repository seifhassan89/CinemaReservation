import {
  CacheModule,
  MiddlewareConsumer,
  Module,
  RequestMethod,
} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonModule } from '../../src/common/common.module';
import { PartyTimeExistsMiddleware } from './party-time-exists.middleware';
import { PartyTimeController } from './party-time.controller';
import { PartyTimeService } from './party-time.service';
import { PartyTime } from './party-time.entity';
import { MovieShow } from '../../src/movie-show/movie-show.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([PartyTime, MovieShow]),
    CacheModule.register(),
    CommonModule,
  ],
  controllers: [PartyTimeController],
  providers: [PartyTimeService],
})
export class PartyTimeModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(PartyTimeExistsMiddleware)
      .forRoutes(
        { path: 'partyTimes/:id', method: RequestMethod.PUT },
        { path: 'partyTimes/:id', method: RequestMethod.DELETE },
      );
  }
}
