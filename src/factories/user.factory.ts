import { Prisma, User } from '@prisma/client';
import * as faker from 'faker';
import { PrismaService } from '../prisma/prisma.service';
import { AbstractFactory } from './baseAbstract.factory';

type UserInputType = Partial<Prisma.UserCreateInput>;

export class UserFactory extends AbstractFactory<User> {
  constructor(protected readonly prismaClient: PrismaService) {
    super();
  }

  async make(input: UserInputType): Promise<User> {
    return await this.prismaClient.user.create({
      data: {
        email: input.email ?? faker.internet.email(),
        password: input.password ?? faker.internet.password(),
        firstName: input.firstName ?? faker.name.firstName(),
        lastName: input.lastName ?? faker.name.lastName(),
        role: input.role,
      },
    });
  }

  async makeMany(factorial: number, input: UserInputType): Promise<User[]> {
    return Promise.all([...Array(factorial)].map(() => this.make(input)));
  }
}
