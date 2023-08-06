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
import { SeatService } from './seat.service';
import { SeatErrors } from './constants/messages.error';
import { SeatSuccess } from './constants/messages.success';
import { PaginateResultDto } from '../../src/common/dto/pagination/paginate-result-dto';
import { PaginateDto } from '../../src/common/dto/pagination/paginate-sort-dto';
import { GetSeatDto } from './dto/get-seat.dto';
import { UpdateSeatDto } from './dto/update-seat.dto';
import { CreateSeatDto } from './dto/create-seat.dto';

@Controller('seats')
@ApiTags('seats')
@ApiBearerAuth()
export class SeatController {
  constructor(private readonly seatService: SeatService) {}

  // **** Get all seats ****
  @Get()
  @SwaggerApiDocumentation({
    summary: 'Get all seats',
    modelType: GetSeatDto,
    isArray: true,
  })
  async findAll(): Promise<BaseApiResponse<GetSeatDto[]>> {
    const Seats = await this.seatService.findAll();
    return new SuccessApiResponse<GetSeatDto[]>(Seats);
  }

  // **** Get all Seats paginated ****
  @Get('paginated')
  @SwaggerApiDocumentation({
    summary: 'Get Seats List with pagination and sort',
    modelType: GetSeatDto,
    isArray: true,
    isPagination: true,
  })
  async findAllPaginated(
    @Query() paginateSortDto: PaginateDto,
  ): Promise<PaginateResultDto<GetSeatDto>> {
    const SeatPage: PaginateResultDto<GetSeatDto> =
      await this.seatService.findAllPaginated(paginateSortDto);
    return SeatPage;
  }

  // **** Get seat by id ****
  @Get(':id')
  @SwaggerApiDocumentation({
    summary: 'Get seat by id',
    modelType: GetSeatDto,
  })
  async getById(
    @Param('id') id: number,
  ): Promise<BaseApiResponse<GetSeatDto>> {
    const Seat = await this.seatService.findById(id);
    if (!Seat) {
      throw new NotFoundException(SeatErrors.NOT_FOUND);
    }
    return new SuccessApiResponse<GetSeatDto>(Seat);
  }

  // **** Create seat ****
  @Post()
  @SwaggerApiDocumentation({
    summary: 'Add new Seat',
    modelType: GetSeatDto,
  })
  async create(@Body() SeatDto: CreateSeatDto): Promise<any> {

    const addedSeat = await this.seatService.create(SeatDto);
    return new SuccessApiResponse<GetSeatDto>(
      addedSeat,
      SeatSuccess.ADDED_SUCCESS,
    );
  }

  // **** Update seat ****
  @Put(':id')
  @SwaggerApiDocumentation({
    summary: 'Update Seat data by id',
    modelType: GetSeatDto,
  })
  async update(
    @Param('id') id: number,
    @Body() SeatDto: UpdateSeatDto,
  ): Promise<BaseApiResponse<GetSeatDto>> {
    const updatedSeat = await this.seatService.update(id, SeatDto);
    return new SuccessApiResponse<GetSeatDto>(
      updatedSeat,
      SeatSuccess.UPDATED_SUCCESS,
    );
  }

  // **** Delete seat ****
  @Delete(':id')
  @SwaggerApiDocumentation({
    summary: 'Delete Seat by id',
    modelType: Object,
  })
  async delete(@Param('id') id: number): Promise<BaseApiResponse<void>> {
    await this.seatService.delete(id);
    return new SuccessApiResponse<void>(null, SeatSuccess.DELETED_SUCCESS);
  }
}
