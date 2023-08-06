import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePartyTimeDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: Date, required: true, description: 'PartyTime from' })
  from: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: Date, required: true, description: 'PartyTime to' })
  to: string;
}
