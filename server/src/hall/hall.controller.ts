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
import { HallService } from './hall.service';
import { HallErrors } from './constants/messages.error';
import { HallSuccess } from './constants/messages.success';
import { PaginateResultDto } from '../../src/common/dto/pagination/paginate-result-dto';
import { PaginateDto } from '../../src/common/dto/pagination/paginate-sort-dto';
import { GetHallDto } from './dto/get-hall.dto';
import { UpdateHallDto } from './dto/update-hall.dto';
import { CreateHallDto } from './dto/create-hall.dto';

@Controller('halls')
@ApiTags('halls')
@ApiBearerAuth()
export class HallController {
  constructor(private readonly hallService: HallService) {}

  // **** Get all halls ****
  @Get()
  @SwaggerApiDocumentation({
    summary: 'Get all halls',
    modelType: GetHallDto,
    isArray: true,
  })
  async findAll(): Promise<BaseApiResponse<GetHallDto[]>> {
    const Halls = await this.hallService.findAll();
    return new SuccessApiResponse<GetHallDto[]>(Halls);
  }

  // **** Get all Halls paginated ****
  @Get('paginated')
  @SwaggerApiDocumentation({
    summary: 'Get Halls List with pagination and sort',
    modelType: GetHallDto,
    isArray: true,
    isPagination: true,
  })
  async findAllPaginated(
    @Query() paginateSortDto: PaginateDto,
  ): Promise<PaginateResultDto<GetHallDto>> {
    const HallPage: PaginateResultDto<GetHallDto> =
      await this.hallService.findAllPaginated(paginateSortDto);
    return HallPage;
  }

  // **** Get hall by id ****
  @Get(':id')
  @SwaggerApiDocumentation({
    summary: 'Get hall by id',
    modelType: GetHallDto,
  })
  async getById(@Param('id') id: number): Promise<BaseApiResponse<GetHallDto>> {
    const Hall = await this.hallService.findById(id);
    if (!Hall) {
      throw new NotFoundException(HallErrors.NOT_FOUND);
    }
    return new SuccessApiResponse<GetHallDto>(Hall);
  }

  // **** Create hall ****
  @Post()
  @SwaggerApiDocumentation({
    summary: 'Add new Hall',
    modelType: GetHallDto,
  })
  async create(@Body() HallDto: CreateHallDto): Promise<any> {
    const addedHall = await this.hallService.create(HallDto);
    return new SuccessApiResponse<GetHallDto>(
      addedHall,
      HallSuccess.ADDED_SUCCESS,
    );
  }

  // **** Update hall ****
  @Put(':id')
  @SwaggerApiDocumentation({
    summary: 'Update Hall data by id',
    modelType: GetHallDto,
  })
  async update(
    @Param('id') id: number,
    @Body() HallDto: UpdateHallDto,
  ): Promise<BaseApiResponse<GetHallDto>> {
    const updatedHall = await this.hallService.update(id, HallDto);
    return new SuccessApiResponse<GetHallDto>(
      updatedHall,
      HallSuccess.UPDATED_SUCCESS,
    );
  }

  // **** Delete hall ****
  @Delete(':id')
  @SwaggerApiDocumentation({
    summary: 'Delete Hall by id',
    modelType: Object,
  })
  async delete(@Param('id') id: number): Promise<BaseApiResponse<void>> {
    await this.hallService.delete(id);
    return new SuccessApiResponse<void>(null, HallSuccess.DELETED_SUCCESS);
  }

  // ***** get by movie id *****
  @Get('movie/:id')
  @SwaggerApiDocumentation({
    summary: 'Get hall by movie id',
    modelType: GetHallDto,
  })
  async getByMovieId(
    @Param('id') id: number,
  ): Promise<BaseApiResponse<GetHallDto[]>> {
    const Hall = await this.hallService.findByMovieId(id);
    if (!Hall) {
      throw new NotFoundException(HallErrors.NOT_FOUND);
    }
    return new SuccessApiResponse<GetHallDto[]>(Hall);
  }
}
