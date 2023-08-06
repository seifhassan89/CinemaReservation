import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginateResultDto } from '../../src/common/dto/pagination/paginate-result-dto';
import { PaginateDto } from '../../src/common/dto/pagination/paginate-sort-dto';
import { Repository } from 'typeorm';
import { CreateMovieDto } from './dto/create-movie.dto';
import { GetMovieDto } from './dto/get-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie } from './movie.entity';

@Injectable()
export class MovieService {
  constructor(
    @InjectRepository(Movie)
    private MovieRepository: Repository<Movie>,
  ) {}

  // **** Get All movie ****
  async findAll(): Promise<GetMovieDto[]> {
    return await this.MovieRepository.find();
  }

  // **** Get movie by id ****
  async findById(id: number): Promise<GetMovieDto> {
    return await this.MovieRepository.findOneBy({ id });
  }

  // **** Create movie ****
  async create(createMovieDto: CreateMovieDto): Promise<Movie> {
    const newMovie = this.MovieRepository.create(createMovieDto);

    await this.MovieRepository.save(newMovie);
    return newMovie;
  }

  // **** Update movie ****
  async update(id: number, MovieDto: UpdateMovieDto): Promise<GetMovieDto> {
    const entity = await this.MovieRepository.findOneBy({ id });
    Object.assign(entity, MovieDto);
    const updatedEntity = await this.MovieRepository.save(entity);
    return updatedEntity as GetMovieDto;
  }

  // **** Delete movie ****
  async delete(id: number): Promise<void> {
    await this.MovieRepository.delete(id);
  }

  // **** Get movie paginated ****
  async findAllPaginated(
    basePaginateDto: PaginateDto,
  ): Promise<PaginateResultDto<GetMovieDto>> {
    const { pageNumber, pageSize, sort, sortOrder } = basePaginateDto;

    const skip = (pageNumber - 1) * pageSize;
    const take = pageSize;

    const [data, count] = await this.MovieRepository.findAndCount({
      order: {
        [sort]: sortOrder,
      },
      skip,
      take,
    });

    const totalPages = Math.ceil(count / pageSize);

    return new PaginateResultDto<Movie>(
      data,
      count,
      pageNumber,
      pageSize,
      totalPages,
    );
  }
}
