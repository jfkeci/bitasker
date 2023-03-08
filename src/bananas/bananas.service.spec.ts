import { Test, TestingModule } from '@nestjs/testing';
import { BananasService } from './bananas.service';

describe('BananasService', () => {
  let service: BananasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BananasService],
    }).compile();

    service = module.get<BananasService>(BananasService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
