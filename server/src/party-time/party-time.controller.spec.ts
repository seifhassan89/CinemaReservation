import { Test, TestingModule } from '@nestjs/testing';
import { PartyTimeController } from './party-time.controller';
import { PartyTimeService } from './party-time.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { PartyTime } from './party-time.entity';
import { MovieShow } from '../movie-show/movie-show.entity';

describe('PartyTimeController', () => {
  let controller: PartyTimeController;
  let service: PartyTimeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PartyTimeController],
      providers: [
        PartyTimeService,
        {
          provide: getRepositoryToken(PartyTime),
          useClass: jest.fn(),
        },
        {
          provide: getRepositoryToken(MovieShow),
          useClass: jest.fn(),
        },
      ],
    }).compile();

    controller = module.get<PartyTimeController>(PartyTimeController);
    service = module.get<PartyTimeService>(PartyTimeService);
  });

  describe('findAll', () => {
    it('should return an array of partyTimes', async () => {
      const mockPartyTimes = [
        { id: 1, from: '12:00:00', to: '14:00:00' },
        { id: 2, from: '15:00:00', to: '17:00:00' },
      ];
      jest.spyOn(service, 'findAll').mockResolvedValue(mockPartyTimes);

      const response = await controller.findAll();

      expect(response).toBeDefined();
      expect(response.data).toHaveLength(2);
      expect(response.data[0].id).toBe(1);
      expect(response.data[0].from).toBe('12:00:00');
      expect(response.data[0].to).toBe('14:00:00');
      expect(response.data[1].id).toBe(2);
      expect(response.data[1].from).toBe('15:00:00');
      expect(response.data[1].to).toBe('17:00:00');
    });
  });
});
