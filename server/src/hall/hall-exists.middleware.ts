import { Injectable, NestMiddleware, NotFoundException } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { HallErrors } from './constants/messages.error';
import { HallService } from './hall.service';

@Injectable()
export class HallExistsMiddleware implements NestMiddleware {
  constructor(private readonly hallService: HallService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const id = +req.params.id;
    const Hall = await this.hallService.findById(id);

    if (!Hall) {
      throw new NotFoundException(HallErrors.NOT_FOUND);
    }
    next();
  }
}
