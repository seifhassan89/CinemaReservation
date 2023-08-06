import { Test, TestingModule } from '@nestjs/testing';
import { MovieController } from './movie.controller';
import { MovieService } from './movie.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Movie } from './movie.entity';

describe('MovieController', () => {
  let controller: MovieController;
  let service: MovieService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MovieController],
      providers: [
        MovieService,
        {
          provide: getRepositoryToken(Movie),
          useClass: jest.fn(),
        },
      ],
    }).compile();

    controller = module.get<MovieController>(MovieController);
    service = module.get<MovieService>(MovieService);
  });

  describe('findAll', () => {
    it('should return an array of movies', async () => {
      const mockMovies = [
        {
          id: 1,
          name: 'The Godfather',
          imageUrl:
            'https://www.google.com/url?sa=i&url=https%3A%2F%2Ffox2now.com%2Fnews%2Fmissouri%2Fthe-godfather-was-nearly-set-in-1970s-st-louis%2F&psig=AOvVaw3ZTWJdoFB47odD6k4ALzxP&ust=1690999311840000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCPD-wryFvIADFQAAAAAdAAAAABAE',
        },
        {
          id: 2,
          name: 'The Dark Knight',
          imageUrl:
            'https://musicart.xboxlive.com/7/abb02f00-0000-0000-0000-000000000002/504/image.jpg?w=1920&h=1080',
        },
      ];
      jest.spyOn(service, 'findAll').mockResolvedValue(mockMovies);

      const response = await controller.findAll();

      expect(response).toBeDefined();
      expect(response.data).toHaveLength(2);
      expect(response.data[0].id).toBe(1);
      expect(response.data[0].name).toBe('The Godfather');
      expect(response.data[1].id).toBe(2);
      expect(response.data[1].name).toBe('The Dark Knight');
    });
  });
});
