import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateReservationDto {
  @ApiProperty({ type: Number, required: true, description: 'Seat row' })
  @IsNotEmpty()
  @IsNumber()
  seatId: number;

  @ApiProperty({ type: Number, required: true, description: 'Movie show id' })
  @IsNotEmpty()
  @IsNumber()
  movieShowId: number;

  @ApiProperty({ type: Date, required: true, description: 'Movie show id' })
  @IsNotEmpty()
  reservationDate: Date;
}
