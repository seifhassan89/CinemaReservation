import { Injectable, NestMiddleware, NotFoundException } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { SeatErrors } from './constants/messages.error';
import { SeatService } from './seat.service';

@Injectable()
export class SeatExistsMiddleware implements NestMiddleware {
  constructor(private readonly seatService: SeatService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const id = +req.params.id;
    const Seat = await this.seatService.findById(id);

    if (!Seat) {
      throw new NotFoundException(SeatErrors.NOT_FOUND);
    }
    next();
  }
}
