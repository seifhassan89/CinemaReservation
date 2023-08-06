import { Injectable, NestMiddleware, NotFoundException } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { ReservationErrors } from './constants/messages.error';
import { ReservationService } from './reservation.service';

@Injectable()
export class ReservationExistsMiddleware implements NestMiddleware {
  constructor(private readonly reservationService: ReservationService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const id = +req.params.id;
    const Reservation = await this.reservationService.findById(id);

    if (!Reservation) {
      throw new NotFoundException(ReservationErrors.NOT_FOUND);
    }
    next();
  }
}
