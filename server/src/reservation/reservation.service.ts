import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginateResultDto } from '../../src/common/dto/pagination/paginate-result-dto';
import { PaginateDto } from '../../src/common/dto/pagination/paginate-sort-dto';
import { Repository } from 'typeorm';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { GetReservationDto } from './dto/get-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { Reservation } from './reservation.entity';
import { MovieShowMetaDataDto } from './dto/movie-show-meta-data.dto';
import { MovieShow } from '../../src/movie-show/movie-show.entity';

@Injectable()
export class ReservationService {
  constructor(
    @InjectRepository(Reservation)
    private ReservationRepository: Repository<Reservation>,
    @InjectRepository(MovieShow)
    private movieShowRepository: Repository<MovieShow>,
  ) {}

  // **** Get All reservation ****
  async findAll(): Promise<GetReservationDto[]> {
    const reservations = await this.getReservationQuery().getMany();
    return reservations.map((reservation) =>
      this.mapReservationDto(reservation),
    );
  }

  // **** Get reservation by id ****
  async findById(id: number): Promise<GetReservationDto> {
    const reservation = await this.getReservationQuery().where({ id }).getOne();
    return this.mapReservationDto(reservation);
  }

  // **** Create reservation ****
  async create(
    createReservationDto: CreateReservationDto,
  ): Promise<GetReservationDto> {
    const movieShow = await this.movieShowRepository.findOne({
      where: {
        movieId: createReservationDto.movieId,
        hallId: createReservationDto.hallId,
        partyTimeId: createReservationDto.partyTimeId,
      },
    });

    if (!movieShow) throw new BadRequestException('Movie show not found');

    const isSeatFree = this.validateReservedSeat(
      createReservationDto.seatId,
      movieShow.id,
      createReservationDto.reservationDate,
    );

    if (!isSeatFree) throw new BadRequestException('seat is reserved');

    const newReservation = this.ReservationRepository.create({
      seatId: createReservationDto.seatId,
      movieShowId: movieShow.id,
      reservationDate: createReservationDto.reservationDate,
    });

    await this.ReservationRepository.save(newReservation);
    return this.mapReservationDto(newReservation);
  }

  // **** Update reservation ****
  async update(
    id: number,
    ReservationDto: UpdateReservationDto,
  ): Promise<GetReservationDto> {
    const entity = await this.ReservationRepository.findOneBy({ id });
    Object.assign(entity, ReservationDto);

    const isSeatFree = this.validateReservedSeat(
      ReservationDto.seatId,
      ReservationDto.movieShowId,
      ReservationDto.reservationDate,
    );

    if (!isSeatFree) throw new BadRequestException('seat is reserved');

    const updatedEntity = await this.ReservationRepository.save(entity);
    return this.mapReservationDto(updatedEntity);
  }

  // **** Delete reservation ****
  async delete(id: number): Promise<void> {
    await this.ReservationRepository.delete(id);
  }

  // **** Get reservation paginated ****
  async findAllPaginated(
    basePaginateDto: PaginateDto,
  ): Promise<PaginateResultDto<GetReservationDto>> {
    const { pageNumber, pageSize, sort, sortOrder } = basePaginateDto;

    const skip = (pageNumber - 1) * pageSize;
    const take = pageSize;

    const [data, count] = await this.getReservationQuery()

      .skip(skip)
      .take(take)
      .orderBy(`reservation.${sort}`, sortOrder)
      .getManyAndCount();

    const totalPages = Math.ceil(count / pageSize);

    return new PaginateResultDto<GetReservationDto>(
      data.map((reservation) => this.mapReservationDto(reservation)),
      count,
      pageNumber,
      pageSize,
      totalPages,
    );
  }

  // **** Map reservation to dto ****
  private mapReservationDto(reservation: Reservation): GetReservationDto {
    return new GetReservationDto({
      hallId: reservation.movieShow?.hallId,
      hallName: reservation.movieShow?.hall?.name,
      movieId: reservation.movieShow?.movieId,
      movieName: reservation.movieShow?.movie?.name,
      partyTimeId: reservation.movieShow?.partyTimeId,
      seatId: reservation.seatId,
      seatCol: reservation.seat?.col,
      seatRow: reservation.seat?.row,
      movieShowId: reservation.movieShow?.id,
      partyTimeFrom: reservation.movieShow?.partyTime?.from,
      partyTimeTo: reservation.movieShow?.partyTime?.to,
      id: reservation.id,
    });
  }

  // **** Get reservation query ****
  private getReservationQuery() {
    return this.ReservationRepository.createQueryBuilder('reservation')
      .leftJoinAndSelect('reservation.seat', 'seat')
      .leftJoinAndSelect('reservation.movieShow', 'movieShow')
      .leftJoinAndSelect('movieShow.movie', 'movie')
      .leftJoinAndSelect('movieShow.partyTime', 'partyTime')
      .leftJoinAndSelect('movieShow.hall', 'hall');
  }

  // **** Get reservation by movie show meta data ****
  async findByMovieShowMetaData(
    movieShowMetaDataDto: MovieShowMetaDataDto,
  ): Promise<GetReservationDto[]> {
    const { hallId, movieId, partyTimeId, reservationDate } =
      movieShowMetaDataDto;

    const reservations = await this.getReservationQuery()
      .where('movieShow.hallId = :hallId', { hallId })
      .andWhere('movieShow.movieId = :movieId', { movieId })
      .andWhere('movieShow.partyTimeId = :partyTimeId', { partyTimeId })
      .andWhere('reservation.reservationDate = :reservationDate', {
        reservationDate,
      })
      .distinct(true)
      .getMany();

    return reservations.map((reservation) =>
      this.mapReservationDto(reservation),
    );
  }

  private async validateReservedSeat(
    seatId: number,
    movieShowId: number,
    reservationDate: Date,
  ) {
    const x = await this.ReservationRepository.createQueryBuilder('reservation')
      .where('reservation.seatId = :seatId', { seatId })
      .andWhere('reservation.movieShowId = :movieShowId', { movieShowId })
      .andWhere('reservation.reservationDate = :reservationDate', {
        reservationDate,
      })
      .getOne();
    return !x;
  }
}
