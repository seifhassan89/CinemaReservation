import { Injectable, NestMiddleware, NotFoundException } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { MovieShowErrors } from './constants/messages.error';
import { MovieShowService } from './movie-show.service';

@Injectable()
export class MovieShowExistsMiddleware implements NestMiddleware {
  constructor(private readonly movieShowService: MovieShowService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const id = +req.params.id;
    const MovieShow = await this.movieShowService.findById(id);

    if (!MovieShow) {
      throw new NotFoundException(MovieShowErrors.NOT_FOUND);
    }
    next();
  }
}
