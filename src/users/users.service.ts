import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../prisma/prisma.service';
import { HttpException, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserDto } from './dto/user.dto';
import { plainToClass } from 'class-transformer';
import { AuthService } from './auth/auth.service';

@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private authService: AuthService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const { email, password } = createUserDto;

    if (await this.prisma.user.count({ where: { email } })) {
      throw new HttpException('email already used', HttpStatus.BAD_REQUEST);
    }

    const createUserHashedDto = {
      ...createUserDto,
      password: await this.authService.hashPassword(password),
    };

    return plainToClass(
      UserDto,
      await this.prisma.user.create({ data: createUserHashedDto }),
    );
  }

  async findAll(): Promise<UserDto[]> {
    const result = await this.prisma.user.findMany();

    const data = plainToClass(UserDto, result);
    return data;
  }

  findOne(id: number) {
    return plainToClass(
      UserDto,
      this.prisma.user.findUnique({
        where: { id: id },
      }),
    );
  }

  findOneByEmail(email: string) {
    return plainToClass(
      UserDto,
      this.prisma.user.findUnique({
        where: { email: email },
      }),
    );
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return plainToClass(
      UserDto,
      this.prisma.user.update({
        data: updateUserDto,
        where: {
          id,
        },
      }),
    );
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
