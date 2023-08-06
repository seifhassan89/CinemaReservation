import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class UpdateSeatDto {
  @IsNumber()
  @ApiProperty({ type: Number, description: 'Seat id' })
  id: number;

  @IsString()
  @ApiProperty({ type: String, description: 'Seat row' })
  row: string;

  @IsNumber()
  @ApiProperty({ type: Number, required: true, description: 'Seat col' })
  col: number;

  @IsNumber()
  @ApiProperty({ type: Number, required: true, description: 'Hall id' })
  hallId: number;
}
