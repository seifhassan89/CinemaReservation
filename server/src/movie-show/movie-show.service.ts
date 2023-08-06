import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginateResultDto } from '../../src/common/dto/pagination/paginate-result-dto';
import { PaginateDto } from '../../src/common/dto/pagination/paginate-sort-dto';
import { Repository } from 'typeorm';
import { CreateMovieShowDto } from './dto/create-movie-show.dto';
import { GetMovieShowDto } from './dto/get-movie-show.dto';
import { UpdateMovieShowDto } from './dto/update-movie-show.dto';
import { MovieShow } from './movie-show.entity';

@Injectable()
export class MovieShowService {
  constructor(
    @InjectRepository(MovieShow)
    private MovieShowRepository: Repository<MovieShow>,
  ) {}

  // **** Get All movieShow ****
  async findAll(): Promise<GetMovieShowDto[]> {
    return await this.MovieShowRepository.find();
  }

  // **** Get movieShow by id ****
  async findById(id: number): Promise<GetMovieShowDto> {
    return await this.MovieShowRepository.findOneBy({ id });
  }

  // **** Create movieShow ****
  async create(createMovieShowDto: CreateMovieShowDto): Promise<MovieShow> {
    await this.validateReservedHall(createMovieShowDto);
    const newMovieShow = this.MovieShowRepository.create(createMovieShowDto);

    await this.MovieShowRepository.save(newMovieShow);
    return newMovieShow;
  }

    private async validateReservedHall(createMovieShowDto: CreateMovieShowDto) {
        const reservedHall = await this.MovieShowRepository.findOneBy({
            hallId: createMovieShowDto.hallId,
            partyTimeId: createMovieShowDto.partyTimeId,
        });
        if (reservedHall) throw new BadRequestException('Hall is reserved for this time');
    }

  // **** Update movieShow ****
  async update(
    id: number,
    MovieShowDto: UpdateMovieShowDto,
  ): Promise<GetMovieShowDto> {
    await this.validateReservedHall(MovieShowDto);
    
    const entity = await this.MovieShowRepository.findOneBy({ id });
    Object.assign(entity, MovieShowDto);
    const updatedEntity = await this.MovieShowRepository.save(entity);
    return updatedEntity as GetMovieShowDto;
  }

  // **** Delete movieShow ****
  async delete(id: number): Promise<void> {
    await this.MovieShowRepository.delete(id);
  }

  // **** Get movieShow paginated ****
  async findAllPaginated(
    basePaginateDto: PaginateDto,
  ): Promise<PaginateResultDto<GetMovieShowDto>> {
    const { pageNumber, pageSize, sort, sortOrder } = basePaginateDto;

    const skip = (pageNumber - 1) * pageSize;
    const take = pageSize;

    const [data, count] = await this.MovieShowRepository.findAndCount({
      order: {
        [sort]: sortOrder,
      },
      skip,
      take,
    });

    const totalPages = Math.ceil(count / pageSize);

    return new PaginateResultDto<MovieShow>(
      data,
      count,
      pageNumber,
      pageSize,
      totalPages,
    );
  }
}
