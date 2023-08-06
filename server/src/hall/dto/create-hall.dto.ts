import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateHallDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String, required: true, description: 'Hall Name' })
  name: string;
}
