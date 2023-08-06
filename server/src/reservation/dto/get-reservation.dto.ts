import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class GetReservationDto {
  @ApiProperty({ type: Number, description: 'id' })
  @IsNumber()
  id?: number;

  @ApiProperty({ type: Number, required: true, description: 'Seat id' })
  @IsNotEmpty()
  @IsNumber()
  seatId: number;

  @ApiProperty({ type: String, required: true, description: 'Seat row' })
  @IsNotEmpty()
  @IsString()
  seatRow: string;

  @ApiProperty({ type: Number, required: true, description: 'Seat column' })
  @IsNotEmpty()
  @IsNumber()
  seatCol: number;

  @ApiProperty({ type: Number, required: true, description: 'hall id' })
  @IsNotEmpty()
  @IsNumber()
  hallId: number;

  @ApiProperty({ type: String, required: true, description: 'hall name' })
  @IsNotEmpty()
  @IsString()
  hallName?: string;

  @ApiProperty({ type: Number, required: true, description: 'Movie id' })
  @IsNotEmpty()
  @IsNumber()
  movieId?: number;

  @ApiProperty({ type: String, required: true, description: 'Movie name' })
  @IsNotEmpty()
  @IsString()
  movieName?: string;

  @ApiProperty({ type: Number, required: true, description: 'Movie show id' })
  @IsNotEmpty()
  @IsNumber()
  movieShowId: number;

  @ApiProperty({ type: Number, required: true, description: 'Party Time id' })
  @IsNotEmpty()
  @IsNumber()
  partyTimeId?: number;

  @ApiProperty({ type: String, required: true, description: 'Party Time From' })
  @IsNotEmpty()
  @IsString()
  partyTimeFrom?: string;

  @ApiProperty({ type: String, required: true, description: 'Party Time To' })
  @IsNotEmpty()
  @IsString()
  partyTimeTo?: string;
  
  constructor(reservation: Partial<GetReservationDto>) {
    Object.assign(this, reservation);
  }
}
