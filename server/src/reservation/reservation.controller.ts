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
import { SwaggerApiDocumentation } from 'src/common/decorators/swagger-api-documentation.decorator';
import { BaseApiResponse } from 'src/common/dto/api-response/base-api-response.dto';
import { SuccessApiResponse } from 'src/common/dto/api-response/success-api-response.dto';
import { ReservationService } from './reservation.service';
import { ReservationErrors } from './constants/messages.error';
import { ReservationSuccess } from './constants/messages.success';
import { PaginateResultDto } from 'src/common/dto/pagination/paginate-result-dto';
import { PaginateDto } from 'src/common/dto/pagination/paginate-sort-dto';
import { GetReservationDto } from './dto/get-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { MovieShowMetaDataDto } from './dto/movie-show-meta-data.dto';

@Controller('reservations')
@ApiTags('reservations')
@ApiBearerAuth()
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  // **** Get all reservations ****
  @Get()
  @SwaggerApiDocumentation({
    summary: 'Get all reservations',
    modelType: GetReservationDto,
    isArray: true,
  })
  async findAll(): Promise<BaseApiResponse<GetReservationDto[]>> {
    const Reservations = await this.reservationService.findAll();
    return new SuccessApiResponse<GetReservationDto[]>(Reservations);
  }

  // **** Get all Reservations paginated ****
  @Get('paginated')
  @SwaggerApiDocumentation({
    summary: 'Get Reservations List with pagination and sort',
    modelType: GetReservationDto,
    isArray: true,
    isPagination: true,
  })
  async findAllPaginated(
    @Query() paginateSortDto: PaginateDto,
  ): Promise<PaginateResultDto<GetReservationDto>> {
    const ReservationPage: PaginateResultDto<GetReservationDto> =
      await this.reservationService.findAllPaginated(paginateSortDto);
    return ReservationPage;
  }

  // **** Get all Reservations paginated ****
  @Get('filtered')
  @SwaggerApiDocumentation({
    summary: 'Get Reservations List filtered by movie show meta data',
    modelType: GetReservationDto,
    isArray: true,
  })
  async findByMovieShowMetaData(
    @Query() movieShowMetaData: MovieShowMetaDataDto,
  ): Promise<GetReservationDto[]> {
    
    const Reservations: GetReservationDto[] =
      await this.reservationService.findByMovieShowMetaData(movieShowMetaData);
    return Reservations;
  }

  // **** Get reservation by id ****
  @Get(':id')
  @SwaggerApiDocumentation({
    summary: 'Get reservation by id',
    modelType: GetReservationDto,
  })
  async getById(
    @Param('id') id: number,
  ): Promise<BaseApiResponse<GetReservationDto>> {
    const Reservation = await this.reservationService.findById(id);
    if (!Reservation) {
      throw new NotFoundException(ReservationErrors.NOT_FOUND);
    }
    return new SuccessApiResponse<GetReservationDto>(Reservation);
  }

  // **** Create reservation ****
  @Post()
  @SwaggerApiDocumentation({
    summary: 'Add new Reservation',
    modelType: GetReservationDto,
  })
  async create(@Body() ReservationDto: CreateReservationDto): Promise<any> {
    const addedReservation = await this.reservationService.create(
      ReservationDto,
    );
    return new SuccessApiResponse<GetReservationDto>(
      addedReservation,
      ReservationSuccess.ADDED_SUCCESS,
    );
  }

  // **** Update reservation ****
  @Put(':id')
  @SwaggerApiDocumentation({
    summary: 'Update Reservation data by id',
    modelType: GetReservationDto,
  })
  async update(
    @Param('id') id: number,
    @Body() ReservationDto: UpdateReservationDto,
  ): Promise<BaseApiResponse<GetReservationDto>> {
    const updatedReservation = await this.reservationService.update(
      id,
      ReservationDto,
    );
    return new SuccessApiResponse<GetReservationDto>(
      updatedReservation,
      ReservationSuccess.UPDATED_SUCCESS,
    );
  }

  // **** Delete reservation ****
  @Delete(':id')
  @SwaggerApiDocumentation({
    summary: 'Delete Reservation by id',
    modelType: Object,
  })
  async delete(@Param('id') id: number): Promise<BaseApiResponse<void>> {
    await this.reservationService.delete(id);
    return new SuccessApiResponse<void>(
      null,
      ReservationSuccess.DELETED_SUCCESS,
    );
  }
}
