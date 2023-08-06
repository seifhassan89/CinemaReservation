import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { Hall } from 'src/hall/hall.entity';
import { Movie } from 'src/movie/movie.entity';
import { PartyTime } from 'src/party-time/party-time.entity';

export class UpdateMovieShowDto {
  @IsNumber()
  @ApiProperty({ type: Number, description: 'MovieShow id' })
  id: number;

  @IsNumber()
  @ApiProperty({ type: Number, required: true, description: 'Hall id' })
  hallId: number;

  @IsNotEmpty()
  @ApiProperty({
    type: Number,
    description: 'hall',
  })
  hall: Hall;

  @IsNumber()
  @ApiProperty({ type: Number, required: true, description: 'Movie id' })
  movieId: number;

  @IsNotEmpty()
  @ApiProperty({
    type: Number,
    description: 'movie',
  })
  movie: Movie;

  @IsNumber()
  @ApiProperty({ type: Number, required: true, description: 'PartyTime id' })
  partyTimeId: number;

  @IsNotEmpty()
  @ApiProperty({
    type: Number,
    description: 'partyTime',
  })
  partyTime: PartyTime;
}
