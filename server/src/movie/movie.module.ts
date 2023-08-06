import {
  CacheModule,
  MiddlewareConsumer,
  Module,
  RequestMethod,
} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonModule } from 'src/common/common.module';
import { MovieExistsMiddleware } from './movie-exists.middleware';
import { MovieController } from './movie.controller';
import { MovieService } from './movie.service';
import { Movie } from './movie.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Movie]),
    CacheModule.register(),
    CommonModule,
  ],
  controllers: [MovieController],
  providers: [MovieService],
})
export class MovieModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(MovieExistsMiddleware)
      .forRoutes(
        { path: 'movies/:id', method: RequestMethod.PUT },
        { path: 'movies/:id', method: RequestMethod.DELETE },
      );
  }
}
