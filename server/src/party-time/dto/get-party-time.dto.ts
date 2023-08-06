import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class GetPartyTimeDto {
  @IsNumber()
  @ApiProperty({ type: Number, description: 'PartyTime id' })
  id: number;

  @IsString()
  @ApiProperty({ type: Date, required: true, description: 'PartyTime from' })
  from: string;

  @IsString()
  @ApiProperty({ type: Date, required: true, description: 'PartyTime to' })
  to: string;
}
