import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateMovieDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String, required: true, description: 'movie Name' })
  name: string;

  @IsString()
  @ApiProperty({
    type: String,
    description: 'movie Image Url',
  })
  imageUrl: string | null;
}
