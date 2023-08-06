import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class GetMovieDto {
  @IsNumber()
  @ApiProperty({ type: Number, description: 'movie id' })
  id: number;

  @IsString()
  @ApiProperty({ type: String, description: 'movie name' })
  name: string;

  @IsString()
  @ApiProperty({ type: String, description: 'movie imageUrl' })
  imageUrl: string | null;
}
