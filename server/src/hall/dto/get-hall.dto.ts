import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class GetHallDto {
  @IsNumber()
  @ApiProperty({ type: Number, description: 'Hall id' })
  id: number;

  @IsString()
  @ApiProperty({ type: String, description: 'Hall name' })
  name: string;
}
