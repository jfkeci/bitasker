import { Module } from '@nestjs/common';
import { BananasService } from './bananas.service';
import { BananasController } from './bananas.controller';

@Module({
  controllers: [BananasController],
  providers: [BananasService]
})
export class BananasModule {}
