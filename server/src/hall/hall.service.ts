import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginateResultDto } from 'src/common/dto/pagination/paginate-result-dto';
import { PaginateDto } from 'src/common/dto/pagination/paginate-sort-dto';
import { Repository } from 'typeorm';
import { CreateHallDto } from './dto/create-hall.dto';
import { GetHallDto } from './dto/get-hall.dto';
import { UpdateHallDto } from './dto/update-hall.dto';
import { Hall } from './hall.entity';
import { MovieShow } from 'src/movie-show/movie-show.entity';

@Injectable()
export class HallService {
  constructor(
    @InjectRepository(Hall)
    private HallRepository: Repository<Hall>,
    @InjectRepository(MovieShow)
    private MovieShowRepository: Repository<MovieShow>,
  ) {}

  // **** Get All hall ****
  async findAll(): Promise<GetHallDto[]> {
    return await this.HallRepository.find();
  }

  // **** Get hall by id ****
  async findById(id: number): Promise<GetHallDto> {
    return await this.HallRepository.findOneBy({ id });
  }

  // **** Create hall ****
  async create(createHallDto: CreateHallDto): Promise<Hall> {
    const newHall = this.HallRepository.create(createHallDto);

    await this.HallRepository.save(newHall);
    return newHall;
  }

  // **** Update hall ****
  async update(id: number, HallDto: UpdateHallDto): Promise<GetHallDto> {
    const entity = await this.HallRepository.findOneBy({ id });
    Object.assign(entity, HallDto);
    const updatedEntity = await this.HallRepository.save(entity);
    return updatedEntity as GetHallDto;
  }

  // **** Delete hall ****
  async delete(id: number): Promise<void> {
    await this.HallRepository.delete(id);
  }

  // **** Get hall paginated ****
  async findAllPaginated(
    basePaginateDto: PaginateDto,
  ): Promise<PaginateResultDto<GetHallDto>> {
    const { pageNumber, pageSize, sort, sortOrder } = basePaginateDto;

    const skip = (pageNumber - 1) * pageSize;
    const take = pageSize;

    const [data, count] = await this.HallRepository.findAndCount({
      order: {
        [sort]: sortOrder,
      },
      skip,
      take,
    });

    const totalPages = Math.ceil(count / pageSize);

    return new PaginateResultDto<Hall>(
      data,
      count,
      pageNumber,
      pageSize,
      totalPages,
    );
  }

  // **** get by movie id ****
  async findByMovieId(id: number): Promise<GetHallDto[]> {
    const ArrayOfHall = await this.MovieShowRepository.createQueryBuilder(
      'movieShow',
    )
      .leftJoinAndSelect('movieShow.hall', 'hall')
      .where('movieShow.movieId = :id', { id })
      .distinctOn(['hall.id'])
      .getMany();

    return ArrayOfHall.map((movieShow) => movieShow.hall);
  }
}
