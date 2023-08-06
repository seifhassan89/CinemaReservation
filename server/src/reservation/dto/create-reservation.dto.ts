import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateReservationDto {
  @ApiProperty({ type: Number, required: true, description: 'Seat row' })
  @IsNotEmpty()
  @IsNumber()
  seatId: number;

  // @ApiProperty({ type: Number, required: true, description: 'Movie show id' })
  // @IsNotEmpty()
  // @IsNumber()
  // movieShowId: number;

  @ApiProperty({ type: Number, required: true, description: 'Movie id' })
  @IsNotEmpty()
  @IsNumber()
  movieId: number;

  @ApiProperty({ type: Number, required: true, description: 'Hall id' })
  @IsNotEmpty()
  @IsNumber()
  hallId: number;

  @ApiProperty({ type: Number, required: true, description: 'Party time id' })
  @IsNotEmpty()
  @IsNumber()
  partyTimeId: number;

  @ApiProperty({ type: Date, required: true, description: 'Reservation date' })
  @IsNotEmpty()
  reservationDate: Date;
}
