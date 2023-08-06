import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginateResultDto } from '../../src/common/dto/pagination/paginate-result-dto';
import { PaginateDto } from '../../src/common/dto/pagination/paginate-sort-dto';
import { Repository } from 'typeorm';
import { CreatePartyTimeDto } from './dto/create-party-time.dto';
import { GetPartyTimeDto } from './dto/get-party-time.dto';
import { UpdatePartyTimeDto } from './dto/update-party-time.dto';
import { PartyTime } from './party-time.entity';
import { MovieShow } from '../../src/movie-show/movie-show.entity';

@Injectable()
export class PartyTimeService {
  constructor(
    @InjectRepository(PartyTime)
    private PartyTimeRepository: Repository<PartyTime>,
    @InjectRepository(MovieShow)
    private MovieShowRepository: Repository<MovieShow>,
  ) {}

  // **** Get All partyTime ****
  async findAll(): Promise<GetPartyTimeDto[]> {
    return await this.PartyTimeRepository.find();
  }

  // **** Get partyTime by id ****
  async findById(id: number): Promise<GetPartyTimeDto> {
    return await this.PartyTimeRepository.findOneBy({ id });
  }

  // **** Create partyTime ****
  async create(createPartyTimeDto: CreatePartyTimeDto): Promise<PartyTime> {
    const newPartyTime = this.PartyTimeRepository.create(createPartyTimeDto);

    await this.PartyTimeRepository.save(newPartyTime);
    return newPartyTime;
  }

  // **** Update partyTime ****
  async update(
    id: number,
    PartyTimeDto: UpdatePartyTimeDto,
  ): Promise<GetPartyTimeDto> {
    const entity = await this.PartyTimeRepository.findOneBy({ id });
    Object.assign(entity, PartyTimeDto);
    const updatedEntity = await this.PartyTimeRepository.save(entity);
    return updatedEntity as GetPartyTimeDto;
  }

  // **** Delete partyTime ****
  async delete(id: number): Promise<void> {
    await this.PartyTimeRepository.delete(id);
  }

  // **** Get partyTime paginated ****
  async findAllPaginated(
    basePaginateDto: PaginateDto,
  ): Promise<PaginateResultDto<GetPartyTimeDto>> {
    const { pageNumber, pageSize, sort, sortOrder } = basePaginateDto;

    const skip = (pageNumber - 1) * pageSize;
    const take = pageSize;

    const [data, count] = await this.PartyTimeRepository.findAndCount({
      order: {
        [sort]: sortOrder,
      },
      skip,
      take,
    });

    const totalPages = Math.ceil(count / pageSize);

    return new PaginateResultDto<PartyTime>(
      data,
      count,
      pageNumber,
      pageSize,
      totalPages,
    );
  }

  findByMovieIdAndHallId(
    movieId: number,
    hallId: number,
  ): Promise<PartyTime[]> {
    const movieShows = this.MovieShowRepository.createQueryBuilder('movieShow')
      .leftJoinAndSelect('movieShow.partyTime', 'partyTime')
      .where('movieShow.movieId = :movieId', { movieId })
      .andWhere('movieShow.hallId = :hallId', { hallId })
      .getMany();

    return movieShows.then((movieShows) => {
      return movieShows.map((movieShow) => movieShow.partyTime);
    });
  }
}
