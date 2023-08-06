import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateSeatDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String, required: true, description: 'Seat row' })
  row: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ type: Number, required: true, description: 'Seat col' })
  col: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ type: Number, required: true, description: 'Hall id' })
  hallId: number;
}
