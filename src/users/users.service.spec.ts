import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import * as faker from 'faker';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    process.env.NODE_ENV = faker.database.engine();
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
