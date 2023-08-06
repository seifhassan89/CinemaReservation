import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsInt, IsOptional, Min } from 'class-validator';

export class PaginateDto {
  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  @IsInt()
  @Min(1)
  @ApiProperty({
    type: Number,
    description: 'The page number of the PlaceAddress',
    default: 1,
  })
  pageNumber = 1;

  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  @IsInt()
  @Min(1)
  @ApiProperty({
    type: Number,
    description: 'The page size of the PlaceAddress',
    default: 10,
  })
  pageSize = 10;

  @IsOptional()
  @ApiProperty({
    type: String,
    description: 'The sort of the PlaceAddress',
    default: 'id',
  })
  sort = 'id';

  @IsOptional()
  @ApiProperty({
    type: String,
    description: 'The sort order of the PlaceAddress',
    default: 'ASC',
  })
  sortOrder: 'ASC' | 'DESC' = 'ASC';

  constructor(partial: Partial<PaginateDto>) {
    Object.assign(this, partial);
  }
}
