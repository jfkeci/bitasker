import { Test, TestingModule } from '@nestjs/testing';
import { BananasController } from './bananas.controller';
import { BananasService } from './bananas.service';

describe('BananasController', () => {
  let controller: BananasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BananasController],
      providers: [BananasService],
    }).compile();

    controller = module.get<BananasController>(BananasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
