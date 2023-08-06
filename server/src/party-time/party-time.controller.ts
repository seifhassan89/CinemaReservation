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
import { PartyTimeService } from './party-time.service';
import { PartyTimeErrors } from './constants/messages.error';
import { PartyTimeSuccess } from './constants/messages.success';
import { PaginateResultDto } from '../../src/common/dto/pagination/paginate-result-dto';
import { PaginateDto } from '../../src/common/dto/pagination/paginate-sort-dto';
import { GetPartyTimeDto } from './dto/get-party-time.dto';
import { UpdatePartyTimeDto } from './dto/update-party-time.dto';
import { CreatePartyTimeDto } from './dto/create-party-time.dto';

@Controller('partyTimes')
@ApiTags('partyTimes')
@ApiBearerAuth()
export class PartyTimeController {
  constructor(private readonly partyTimeService: PartyTimeService) {}

  // **** Get all partyTimes ****
  @Get()
  @SwaggerApiDocumentation({
    summary: 'Get all partyTimes',
    modelType: GetPartyTimeDto,
    isArray: true,
  })
  async findAll(): Promise<BaseApiResponse<GetPartyTimeDto[]>> {
    const PartyTimes = await this.partyTimeService.findAll();
    return new SuccessApiResponse<GetPartyTimeDto[]>(PartyTimes);
  }

  // **** Get all PartyTimes paginated ****
  @Get('paginated')
  @SwaggerApiDocumentation({
    summary: 'Get PartyTimes List with pagination and sort',
    modelType: GetPartyTimeDto,
    isArray: true,
    isPagination: true,
  })
  async findAllPaginated(
    @Query() paginateSortDto: PaginateDto,
  ): Promise<PaginateResultDto<GetPartyTimeDto>> {
    const PartyTimePage: PaginateResultDto<GetPartyTimeDto> =
      await this.partyTimeService.findAllPaginated(paginateSortDto);
    return PartyTimePage;
  }

  // **** Get partyTime by id ****
  @Get(':id')
  @SwaggerApiDocumentation({
    summary: 'Get partyTime by id',
    modelType: GetPartyTimeDto,
  })
  async getById(
    @Param('id') id: number,
  ): Promise<BaseApiResponse<GetPartyTimeDto>> {
    const PartyTime = await this.partyTimeService.findById(id);
    if (!PartyTime) {
      throw new NotFoundException(PartyTimeErrors.NOT_FOUND);
    }
    return new SuccessApiResponse<GetPartyTimeDto>(PartyTime);
  }

  // **** Create partyTime ****
  @Post()
  @SwaggerApiDocumentation({
    summary: 'Add new PartyTime',
    modelType: GetPartyTimeDto,
  })
  async create(@Body() PartyTimeDto: CreatePartyTimeDto): Promise<any> {
    const addedPartyTime = await this.partyTimeService.create(PartyTimeDto);
    return new SuccessApiResponse<GetPartyTimeDto>(
      addedPartyTime,
      PartyTimeSuccess.ADDED_SUCCESS,
    );
  }

  // **** Update partyTime ****
  @Put(':id')
  @SwaggerApiDocumentation({
    summary: 'Update PartyTime data by id',
    modelType: GetPartyTimeDto,
  })
  async update(
    @Param('id') id: number,
    @Body() PartyTimeDto: UpdatePartyTimeDto,
  ): Promise<BaseApiResponse<GetPartyTimeDto>> {
    const updatedPartyTime = await this.partyTimeService.update(
      id,
      PartyTimeDto,
    );
    return new SuccessApiResponse<GetPartyTimeDto>(
      updatedPartyTime,
      PartyTimeSuccess.UPDATED_SUCCESS,
    );
  }

  // **** Delete partyTime ****
  @Delete(':id')
  @SwaggerApiDocumentation({
    summary: 'Delete PartyTime by id',
    modelType: Object,
  })
  async delete(@Param('id') id: number): Promise<BaseApiResponse<void>> {
    await this.partyTimeService.delete(id);
    return new SuccessApiResponse<void>(null, PartyTimeSuccess.DELETED_SUCCESS);
  }

  // **** Get partyTime by movie id and hall id ****
  @Get('movie/:movieId/hall/:hallId')
  @SwaggerApiDocumentation({
    summary: 'Get partyTime by movie id and hall id',
    modelType: GetPartyTimeDto,
  })
  async getByMovieIdAndHallId(
    @Param('movieId') movieId: number,
    @Param('hallId') hallId: number,
  ): Promise<BaseApiResponse<GetPartyTimeDto[]>> {
    const PartyTime = await this.partyTimeService.findByMovieIdAndHallId(
      movieId,
      hallId,
    );
    if (!PartyTime) {
      throw new NotFoundException(PartyTimeErrors.NOT_FOUND);
    }
    return new SuccessApiResponse<GetPartyTimeDto[]>(PartyTime);
  }
}
