import {
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
  ApiOkResponse
} from '@nestjs/swagger';
import { EncodeStringDto } from '../dto/encode-string.dto';
import { EncoderService } from '../service/encoder.service';
import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { EncodedStringResponse } from '../responses/encoded-string.response';

@ApiBearerAuth()
@ApiTags('Encoder')
@Controller('encode')
export class EncoderController {
  constructor(private readonly encoderService: EncoderService) {}

  @ApiOperation({
    summary: 'Encode string',
    description: `Encoder function that accepts a string and the output represents successive characters as character and single digit count. For example, the string “XXXYYYYZZQXX” is encoded as “X3Y4Z2Q1X2”`
  })
  @ApiOkResponse({
    type: EncodedStringResponse,
    description: 'Encoded string response'
  })
  @Post()
  @HttpCode(200)
  encodeString(@Body() body: EncodeStringDto) {
    return this.encoderService.encodeV1(body.text);
  }
}
