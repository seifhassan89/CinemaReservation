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
import { MovieShowService } from './movie-show.service';
import { MovieShowErrors } from './constants/messages.error';
import { MovieShowSuccess } from './constants/messages.success';
import { PaginateResultDto } from '../../src/common/dto/pagination/paginate-result-dto';
import { PaginateDto } from '../../src/common/dto/pagination/paginate-sort-dto';
import { GetMovieShowDto } from './dto/get-movie-show.dto';
import { UpdateMovieShowDto } from './dto/update-movie-show.dto';
import { CreateMovieShowDto } from './dto/create-movie-show.dto';

@Controller('movieShows')
@ApiTags('movieShows')
@ApiBearerAuth()
export class MovieShowController {
  constructor(private readonly movieShowService: MovieShowService) {}

  // **** Get all movieShows ****
  @Get()
  @SwaggerApiDocumentation({
    summary: 'Get all movieShows',
    modelType: GetMovieShowDto,
    isArray: true,
  })
  async findAll(): Promise<BaseApiResponse<GetMovieShowDto[]>> {
    const MovieShows = await this.movieShowService.findAll();
    return new SuccessApiResponse<GetMovieShowDto[]>(MovieShows);
  }

  // **** Get all MovieShows paginated ****
  @Get('paginated')
  @SwaggerApiDocumentation({
    summary: 'Get MovieShows List with pagination and sort',
    modelType: GetMovieShowDto,
    isArray: true,
    isPagination: true,
  })
  async findAllPaginated(
    @Query() paginateSortDto: PaginateDto,
  ): Promise<PaginateResultDto<GetMovieShowDto>> {
    const MovieShowPage: PaginateResultDto<GetMovieShowDto> =
      await this.movieShowService.findAllPaginated(paginateSortDto);
    return MovieShowPage;
  }

  // **** Get movieShow by id ****
  @Get(':id')
  @SwaggerApiDocumentation({
    summary: 'Get movieShow by id',
    modelType: GetMovieShowDto,
  })
  async getById(
    @Param('id') id: number,
  ): Promise<BaseApiResponse<GetMovieShowDto>> {
    const MovieShow = await this.movieShowService.findById(id);
    if (!MovieShow) {
      throw new NotFoundException(MovieShowErrors.NOT_FOUND);
    }
    return new SuccessApiResponse<GetMovieShowDto>(MovieShow);
  }

  // **** Create movieShow ****
  @Post()
  @SwaggerApiDocumentation({
    summary: 'Add new MovieShow',
    modelType: GetMovieShowDto,
  })
  async create(@Body() MovieShowDto: CreateMovieShowDto): Promise<any> {

    const addedMovieShow = await this.movieShowService.create(MovieShowDto);
    return new SuccessApiResponse<GetMovieShowDto>(
      addedMovieShow,
      MovieShowSuccess.ADDED_SUCCESS,
    );
  }

  // **** Update movieShow ****
  @Put(':id')
  @SwaggerApiDocumentation({
    summary: 'Update MovieShow data by id',
    modelType: GetMovieShowDto,
  })
  async update(
    @Param('id') id: number,
    @Body() MovieShowDto: UpdateMovieShowDto,
  ): Promise<BaseApiResponse<GetMovieShowDto>> {
    const updatedMovieShow = await this.movieShowService.update(id, MovieShowDto);
    return new SuccessApiResponse<GetMovieShowDto>(
      updatedMovieShow,
      MovieShowSuccess.UPDATED_SUCCESS,
    );
  }

  // **** Delete movieShow ****
  @Delete(':id')
  @SwaggerApiDocumentation({
    summary: 'Delete MovieShow by id',
    modelType: Object,
  })
  async delete(@Param('id') id: number): Promise<BaseApiResponse<void>> {
    await this.movieShowService.delete(id);
    return new SuccessApiResponse<void>(null, MovieShowSuccess.DELETED_SUCCESS);
  }
}
