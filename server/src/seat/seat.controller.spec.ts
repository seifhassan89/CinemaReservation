import { Test, TestingModule } from '@nestjs/testing';
import { SeatController } from './seat.controller';
import { SeatService } from './seat.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Seat } from './seat.entity';
import { Hall } from '../../src/hall/hall.entity';
import { Reservation } from '../../src/reservation/reservation.entity';

describe('SeatController', () => {
  let controller: SeatController;
  let service: SeatService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SeatController],
      providers: [
        SeatService,
        {
          provide: getRepositoryToken(Seat),
          useClass: jest.fn(),
        },
        {
          provide: getRepositoryToken(Hall),
          useClass: jest.fn(),
        },
        {
          provide: getRepositoryToken(Reservation),
          useClass: jest.fn(),
        },
      ],
    }).compile();

    controller = module.get<SeatController>(SeatController);
    service = module.get<SeatService>(SeatService);
  });

  describe('findAll', () => {
    it('should return an array of seats', async () => {
      const mockSeats = [
        { id: 1, row: 'A', col: 1, hallId: 1 },
        { id: 2, row: 'A', col: 2, hallId: 1 },
      ];
      jest.spyOn(service, 'findAll').mockResolvedValue(mockSeats);

      const response = await controller.findAll();

      expect(response).toBeDefined();
      expect(response.data).toHaveLength(2);
      expect(response.data[0].id).toBe(1);
      expect(response.data[0].row).toBe('A');
      expect(response.data[0].col).toBe(1);
      expect(response.data[1].id).toBe(2);
      expect(response.data[1].row).toBe('A');
      expect(response.data[1].col).toBe(2);
    });
  });

  // Add more test cases for other controller methods
});
