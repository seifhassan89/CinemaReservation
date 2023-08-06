import {
  CacheModule,
  MiddlewareConsumer,
  Module,
  RequestMethod,
} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonModule } from 'src/common/common.module';
import { MovieShowExistsMiddleware } from './movie-show-exists.middleware';
import { MovieShowController } from './movie-show.controller';
import { MovieShowService } from './movie-show.service';
import { MovieShow } from './movie-show.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([MovieShow]),
    CacheModule.register(),
    CommonModule,
  ],
  controllers: [MovieShowController],
  providers: [MovieShowService],
})
export class MovieShowModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(MovieShowExistsMiddleware)
      .forRoutes(
        { path: 'movieShows/:id', method: RequestMethod.PUT },
        { path: 'movieShows/:id', method: RequestMethod.DELETE },
      );
  }
}
