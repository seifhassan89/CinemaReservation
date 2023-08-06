import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

export class CreateMovieShowDto {
  @Min(1)
  @IsNumber()
  @ApiProperty({ type: Number, required: true, description: 'hallId' })
  hallId: number;

  @Min(1)
  @IsNumber()
  @ApiProperty({ type: Number, required: true, description: 'movieId' })
  movieId: number;

  @Min(1)
  @IsNumber()
  @ApiProperty({ type: Number, required: true, description: 'partyTimeId' })
  partyTimeId: number;
}
