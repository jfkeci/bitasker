import { Module } from '@nestjs/common';
import { EncoderService } from './service/encoder.service';
import { EncoderController } from './controller/encoder.controller';

@Module({
  providers: [EncoderService],
  controllers: [EncoderController]
})
export class EncoderModule {}
