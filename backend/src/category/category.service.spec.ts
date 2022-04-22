import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'sequelize-typescript';
import { CATEGORY_REPOSITORY } from '../constants/index';
import { category } from '../models/category';
import { CategoryService } from './category.service';

describe('CategoryService', () => {
  let service: CategoryService;
  let categoryRepo: Repository<category>;
  const mockCat = {
    category_id: 'category-id',
    category_name: 'Grocery',
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategoryService,
        {
          provide: CATEGORY_REPOSITORY,
          useValue: {
            create: jest.fn((data) => data),
            findOne: jest.fn((category_id: string) => {
              return { category_id, ...mockCat };
            }),
            findAll: jest.fn(() => [mockCat]),
          },
        },
      ],
    }).compile();

    service = module.get<CategoryService>(CategoryService);
    categoryRepo = module.get<Repository<category>>(CATEGORY_REPOSITORY);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('categoryRepo should be defined', () => {
    expect(categoryRepo).toBeDefined();
  });

  describe('Create an category', () => {
    it('should create a category with given body and return it', async () => {
      expect(await service.createCategory(mockCat)).toEqual({
        category_id: 'category-id',
        ...mockCat,
      });
    });

    it('should call the catRepo.create once and with the correct params', async () => {
      await service.createCategory(mockCat);
      expect(categoryRepo.create).toHaveBeenCalled();
      expect(categoryRepo.create).toHaveBeenCalledTimes(1);
      expect(categoryRepo.create).toHaveBeenCalledWith(mockCat);
    });

    it('should return the correct types', () => {
      return service.createCategory(mockCat).then((cat) => {
        expect(typeof cat.category_id).toBe('string');
        expect(typeof cat.category_name).toBe('string');
      });
    });
  });
});
