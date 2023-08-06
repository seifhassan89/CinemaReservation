import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginateResultDto } from 'src/common/dto/pagination/paginate-result-dto';
import { PaginateDto } from 'src/common/dto/pagination/paginate-sort-dto';
import { Repository } from 'typeorm';
import { CreateSeatDto } from './dto/create-seat.dto';
import { GetSeatDto } from './dto/get-seat.dto';
import { UpdateSeatDto } from './dto/update-seat.dto';
import { Seat } from './seat.entity';

@Injectable()
export class SeatService {
  constructor(
    @InjectRepository(Seat)
    private SeatRepository: Repository<Seat>,
  ) {}

  // **** Get All seat ****
  async findAll(): Promise<GetSeatDto[]> {
    return await this.SeatRepository.find();
  }

  // **** Get seat by id ****
  async findById(id: number): Promise<GetSeatDto> {
    return await this.SeatRepository.findOneBy({ id });
  }

  // **** Create seat ****
  async create(createSeatDto: CreateSeatDto): Promise<Seat> {
    const newSeat = this.SeatRepository.create(createSeatDto);

    await this.SeatRepository.save(newSeat);
    return newSeat;
  }

  // **** Update seat ****
  async update(id: number, SeatDto: UpdateSeatDto): Promise<GetSeatDto> {
    const entity = await this.SeatRepository.findOneBy({ id });
    Object.assign(entity, SeatDto);
    const updatedEntity = await this.SeatRepository.save(entity);
    return updatedEntity as GetSeatDto;
  }

  // **** Delete seat ****
  async delete(id: number): Promise<void> {
    await this.SeatRepository.delete(id);
  }

  // **** Get seat paginated ****
  async findAllPaginated(
    basePaginateDto: PaginateDto,
  ): Promise<PaginateResultDto<GetSeatDto>> {
    const { pageNumber, pageSize, sort, sortOrder } = basePaginateDto;

    const skip = (pageNumber - 1) * pageSize;
    const take = pageSize;

    const [data, count] = await this.SeatRepository.findAndCount({
      order: {
        [sort]: sortOrder,
      },
      skip,
      take,
    });

    const totalPages = Math.ceil(count / pageSize);

    return new PaginateResultDto<Seat>(
      data,
      count,
      pageNumber,
      pageSize,
      totalPages,
    );
  }
}
