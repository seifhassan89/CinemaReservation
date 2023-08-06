import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsInt, IsOptional } from 'class-validator';

export class GetSeatSortDto {
  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  @IsInt()
  @ApiProperty({
    type: Number,
    description: 'hallId',
  })
  hallId: number;

  constructor(partial: Partial<GetSeatSortDto>) {
    Object.assign(this, partial);
  }
}
