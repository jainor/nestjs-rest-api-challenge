import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { UserFactory } from '../factories/user.factory';
import { PrismaService } from '../prisma/prisma.service';
import * as faker from 'faker';
import { RoleType } from '@prisma/client';

describe('UsersService', () => {
  let userService: UsersService;
  let prismaService: PrismaService;
  let userFactory: UserFactory;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService, PrismaService, UserFactory],
    }).compile();

    userService = module.get<UsersService>(UsersService);
    prismaService = module.get<PrismaService>(PrismaService);
    userFactory = new UserFactory(prismaService);
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
    expect(prismaService).toBeDefined();
    expect(userFactory).toBeDefined();
  });

  describe('getUser', () => {
    let email: string;
    let password: string;
    let firstName: string;
    let lastName: string;
    let role: RoleType;

    let user: any;

    beforeAll(async () => {
      email = faker.internet.email();
      password = faker.internet.password();
      firstName = faker.name.firstName();
      lastName = faker.name.lastName();
      role = RoleType.admin;

      user = await userFactory.make({
        email,
        password,
        firstName,
        lastName,
        role,
      });
    });

    it('should return a user with a given id', async () => {
      const result = await userService.findOne(user.id);
      const resultByEmail = await userService.findOneByEmail(user.email);

      expect(result).toBeDefined();
      expect(resultByEmail).toBeDefined();
      expect(result).toEqual(resultByEmail);
      expect(result).toHaveProperty('id', user.id);
      expect(result).toHaveProperty('email', user.email);
    });

    it('should retun a null value when when the user is not found', async () => {
      const result = await userService.findOne(faker.datatype.number());
      expect(result).toBeNull();
    });
  });

  afterAll(async () => {
    await prismaService.$disconnect();
  });
});
