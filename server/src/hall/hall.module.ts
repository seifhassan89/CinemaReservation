import {
  CacheModule,
  MiddlewareConsumer,
  Module,
  RequestMethod,
} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonModule } from '../../src/common/common.module';
import { HallExistsMiddleware } from './hall-exists.middleware';
import { HallController } from './hall.controller';
import { HallService } from './hall.service';
import { Hall } from './hall.entity';
import { MovieShow } from '../../src/movie-show/movie-show.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Hall, MovieShow]),
    CacheModule.register(),
    CommonModule,
  ],
  controllers: [HallController],
  providers: [HallService],
})
export class HallModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(HallExistsMiddleware)
      .forRoutes(
        { path: 'halls/:id', method: RequestMethod.PUT },
        { path: 'halls/:id', method: RequestMethod.DELETE },
      );
  }
}
