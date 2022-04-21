import { Test, TestingModule } from '@nestjs/testing';
import { AdminResolver } from './admin.resolver';

describe('AdminResolver', () => {
  let resolver: AdminResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AdminResolver],
    }).compile();

    resolver = module.get<AdminResolver>(AdminResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
