import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { SwaggerApiDocumentation } from '../../src/common/decorators/swagger-api-documentation.decorator';
import { BaseApiResponse } from '../../src/common/dto/api-response/base-api-response.dto';
import { SuccessApiResponse } from '../../src/common/dto/api-response/success-api-response.dto';
import { MovieService } from './movie.service';
import { MovieErrors } from './constants/messages.error';
import { MovieSuccess } from './constants/messages.success';
import { PaginateResultDto } from '../../src/common/dto/pagination/paginate-result-dto';
import { PaginateDto } from '../../src/common/dto/pagination/paginate-sort-dto';
import { GetMovieDto } from './dto/get-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { CreateMovieDto } from './dto/create-movie.dto';

@Controller('movies')
@ApiTags('movies')
@ApiBearerAuth()
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  // **** Get all movies ****
  @Get()
  @SwaggerApiDocumentation({
    summary: 'Get all movies',
    modelType: GetMovieDto,
    isArray: true,
  })
  async findAll(): Promise<BaseApiResponse<GetMovieDto[]>> {
    const Movies = await this.movieService.findAll();
    return new SuccessApiResponse<GetMovieDto[]>(Movies);
  }

  // **** Get all Movies paginated ****
  @Get('paginated')
  @SwaggerApiDocumentation({
    summary: 'Get Movies List with pagination and sort',
    modelType: GetMovieDto,
    isArray: true,
    isPagination: true,
  })
  async findAllPaginated(
    @Query() paginateSortDto: PaginateDto,
  ): Promise<PaginateResultDto<GetMovieDto>> {
    const MoviePage: PaginateResultDto<GetMovieDto> =
      await this.movieService.findAllPaginated(paginateSortDto);
    return MoviePage;
  }

  // **** Get movie by id ****
  @Get(':id')
  @SwaggerApiDocumentation({
    summary: 'Get movie by id',
    modelType: GetMovieDto,
  })
  async getById(
    @Param('id') id: number,
  ): Promise<BaseApiResponse<GetMovieDto>> {
    const Movie = await this.movieService.findById(id);
    if (!Movie) {
      throw new NotFoundException(MovieErrors.NOT_FOUND);
    }
    return new SuccessApiResponse<GetMovieDto>(Movie);
  }

  // **** Create movie ****
  @Post()
  @SwaggerApiDocumentation({
    summary: 'Add new Movie',
    modelType: GetMovieDto,
  })
  async create(@Body() MovieDto: CreateMovieDto): Promise<any> {

    const addedMovie = await this.movieService.create(MovieDto);
    return new SuccessApiResponse<GetMovieDto>(
      addedMovie,
      MovieSuccess.ADDED_SUCCESS,
    );
  }

  // **** Update movie ****
  @Put(':id')
  @SwaggerApiDocumentation({
    summary: 'Update Movie data by id',
    modelType: GetMovieDto,
  })
  async update(
    @Param('id') id: number,
    @Body() MovieDto: UpdateMovieDto,
  ): Promise<BaseApiResponse<GetMovieDto>> {
    const updatedMovie = await this.movieService.update(id, MovieDto);
    return new SuccessApiResponse<GetMovieDto>(
      updatedMovie,
      MovieSuccess.UPDATED_SUCCESS,
    );
  }

  // **** Delete movie ****
  @Delete(':id')
  @SwaggerApiDocumentation({
    summary: 'Delete Movie by id',
    modelType: Object,
  })
  async delete(@Param('id') id: number): Promise<BaseApiResponse<void>> {
    await this.movieService.delete(id);
    return new SuccessApiResponse<void>(null, MovieSuccess.DELETED_SUCCESS);
  }
}
