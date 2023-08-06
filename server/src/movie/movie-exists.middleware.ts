import { Injectable, NestMiddleware, NotFoundException } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { MovieErrors } from './constants/messages.error';
import { MovieService } from './movie.service';

@Injectable()
export class MovieExistsMiddleware implements NestMiddleware {
  constructor(private readonly movieService: MovieService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const id = +req.params.id;
    const Movie = await this.movieService.findById(id);

    if (!Movie) {
      throw new NotFoundException(MovieErrors.NOT_FOUND);
    }
    next();
  }
}
