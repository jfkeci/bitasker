import { ApiProperty } from '@nestjs/swagger';

export class EncodedStringResponse {
  @ApiProperty()
  text: string;
}
