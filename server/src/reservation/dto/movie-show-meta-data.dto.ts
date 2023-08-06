import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class MovieShowMetaDataDto {
  @ApiProperty({ type: String, required: true, description: 'hall id' })
  @IsNotEmpty()
  @IsString()
  hallId: string;

  @ApiProperty({ type: String, required: true, description: 'Movie id' })
  @IsNotEmpty()
  @IsString()
  movieId: string;

  @ApiProperty({ type: String, required: true, description: 'Party Time id' })
  @IsNotEmpty()
  @IsString()
  partyTimeId: string;

  @ApiProperty({ type: Date, required: true, description: 'Party Time id' })
  @IsNotEmpty()
  reservationDate: Date;

  constructor(reservation: Partial<MovieShowMetaDataDto>) {
    Object.assign(this, reservation);
  }
}
