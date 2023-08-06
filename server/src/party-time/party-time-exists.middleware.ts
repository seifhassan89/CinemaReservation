import { Injectable, NestMiddleware, NotFoundException } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { PartyTimeErrors } from './constants/messages.error';
import { PartyTimeService } from './party-time.service';

@Injectable()
export class PartyTimeExistsMiddleware implements NestMiddleware {
  constructor(private readonly partyTimeService: PartyTimeService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const id = +req.params.id;
    const PartyTime = await this.partyTimeService.findById(id);

    if (!PartyTime) {
      throw new NotFoundException(PartyTimeErrors.NOT_FOUND);
    }
    next();
  }
}
