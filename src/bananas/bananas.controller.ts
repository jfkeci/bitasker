import { Controller, Get } from '@nestjs/common';
import { BananasService } from './bananas.service';

@Controller('bananas')
export class BananasController {
  constructor(private readonly bananasService: BananasService) {}

  @Get()
  test() {
    return {
      banana: 'mango'
    };
  }
}
