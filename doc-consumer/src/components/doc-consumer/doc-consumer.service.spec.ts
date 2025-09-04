import { Test, TestingModule } from '@nestjs/testing';
import { DocConsumerService } from './doc-consumer.service';

describe('DocConsumerService', () => {
  let service: DocConsumerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DocConsumerService],
    }).compile();

    service = module.get<DocConsumerService>(DocConsumerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
