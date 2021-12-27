import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../prisma/prisma.service';
import { HttpException, HttpStatus } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { plainToClass } from 'class-transformer';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const { email } = createUserDto;

    if (await this.prisma.user.count({ where: { email } })) {
      throw new HttpException('email already used', HttpStatus.BAD_REQUEST);
    }

    return this.prisma.user.create({ data: createUserDto });
  }

  async findAll(): Promise<UserDto[]> {
    return this.prisma.user.findMany();
  }

  findOne(id: number) {
    return this.prisma.user.findUnique({
      where: { id: id },
    });
  }

  findOneByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email: email },
    });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.prisma.user.update({
      data: updateUserDto,
      where: {
        id,
      },
    });
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
