import { Test, TestingModule } from '@nestjs/testing';
import { HallController } from './hall.controller';
import { HallService } from './hall.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Hall } from './hall.entity';
import { MovieShow } from '../../src/movie-show/movie-show.entity';

describe('HallController', () => {
  let controller: HallController;
  let service: HallService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HallController],
      providers: [
        HallService,
        {
          provide: getRepositoryToken(Hall),
          useClass: jest.fn(),
        },
        {
          provide: getRepositoryToken(MovieShow),
          useClass: jest.fn(),
        },
      ],
    }).compile();

    controller = module.get<HallController>(HallController);
    service = module.get<HallService>(HallService);
  });

  describe('findAll', () => {
    it('should return an array of halls', async () => {
      const mockHalls = [
        { id: 1, name: 'Business Hall' },
        { id: 2, name: 'A Class Hall' },
      ];
      jest.spyOn(service, 'findAll').mockResolvedValue(mockHalls);

      const response = await controller.findAll();

      expect(response).toBeDefined();
      expect(response.data).toHaveLength(2);
      expect(response.data[0].id).toBe(1);
      expect(response.data[0].name).toBe('Business Hall');
      expect(response.data[1].id).toBe(2);
      expect(response.data[1].name).toBe('A Class Hall');
    });
  });

  // Add more test cases for other controller methods
});
