import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Matches } from 'class-validator';

export class EncodeStringDto {
  @Matches(/^[a-zA-Z]+$/, { message: 'Text should only contain letters' })
  @IsString({ message: 'Text should be a valid string' })
  @IsNotEmpty({ message: 'Text required' })
  @ApiProperty()
  text: string;
}
