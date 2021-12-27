import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from '../users.service';
import { PrismaService } from '../../prisma/prisma.service';
import { UserFactory } from '../../factories/user.factory';
import { RoleType } from '@prisma/client';
import * as faker from 'faker';
import { JwtService } from '@nestjs/jwt';

describe('AuthService', () => {
  let authService: AuthService;
  let prismaService: PrismaService;
  let userFactory: UserFactory;
  let userService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: JwtService, useValue: {} },
        PrismaService,
        UsersService,
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    prismaService = module.get<PrismaService>(PrismaService);
    userService = module.get<UsersService>(UsersService);

    userFactory = new UserFactory(prismaService);
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
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
        password: await authService.hashPassword(password),
        firstName,
        lastName,
        role,
      });
    });

    it('should check if passwords match', async () => {
      const equalPassword = authService.validatePassword(
        password,
        user.password,
      );
      expect(equalPassword).toBeDefined();
      expect(equalPassword).toBeTruthy();
    });
  });

  afterAll(async () => {
    await prismaService.$disconnect();
  });
});
