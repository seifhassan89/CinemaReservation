import { Test, TestingModule } from '@nestjs/testing';
import { ReservationController } from './reservation.controller';
import { ReservationService } from './reservation.service';
import { GetReservationDto } from './dto/get-reservation.dto';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Reservation } from './reservation.entity';
import { Seat } from '../../src/seat/seat.entity';
import { MovieShow } from '../../src/movie-show/movie-show.entity';

describe('ReservationController', () => {
  let controller: ReservationController;
  let service: ReservationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReservationController],
      providers: [
        ReservationService,
        {
          provide: getRepositoryToken(Reservation),
          useClass: jest.fn(),
        },
        {
          provide: getRepositoryToken(Seat),
          useClass: jest.fn(),
        },
        {
          provide: getRepositoryToken(MovieShow),
          useClass: jest.fn(),
        },
      ],
    }).compile();

    controller = module.get<ReservationController>(ReservationController);
    service = module.get<ReservationService>(ReservationService);
  });

  describe('findAll', () => {
    it('should return an array of reservations', async () => {
      const mockReservations: GetReservationDto[] = [
        {
          id: 1,
          seatId: 1,
          seatRow: 'A',
          seatCol: 1,
          hallId: 1,
          movieShowId: 1,
        },
        {
          id: 2,
          seatId: 2,
          seatRow: 'A',
          seatCol: 2,
          hallId: 2,
          movieShowId: 2,
        },
      ];
      jest.spyOn(service, 'findAll').mockResolvedValue(mockReservations);

      const response = await controller.findAll();

      expect(response).toBeDefined();
      expect(response.data).toHaveLength(2);
      expect(response.data[0].id).toBe(1);
      expect(response.data[0].seatId).toBe(1);
      expect(response.data[0].movieShowId).toBe(1);
      expect(response.data[1].id).toBe(2);
      expect(response.data[1].seatId).toBe(2);
      expect(response.data[1].movieShowId).toBe(2);
    });
  });

  // Add more test cases for other controller methods
});
