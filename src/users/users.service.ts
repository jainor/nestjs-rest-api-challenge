import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../prisma/prisma.service';
import { HttpException, HttpStatus } from '@nestjs/common';
import { CredentialsUserDto } from './dto/credentials-user.dto';
import * as bcrypt from 'bcrypt';
import { JwtPayload } from '../jwt-strategy/jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';
import { PublicUserDto } from './dto/public-user.dto';
import { UserDto } from './dto/user.dto';
import { plainToClass } from 'class-transformer';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}

  async create(createUserDto: CreateUserDto) {
    const { id, email, password } = createUserDto;

    if (await this.prisma.user.count({ where: { id } })) {
      throw new HttpException('id already used', HttpStatus.BAD_REQUEST);
    }

    if (await this.prisma.user.count({ where: { email } })) {
      throw new HttpException('email already used', HttpStatus.BAD_REQUEST);
    }

    const createUserHashedDto = {
      ...createUserDto,
      password: await this.hashPassword(password),
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
    return this.prisma.user.findUnique({
      where: { id: id },
    });
  }

  findOneByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email: email },
    });
  }

  update(id: number, user: PublicUserDto, updateUserDto: UpdateUserDto) {
    if (id != user.id) {
      throw new UnauthorizedException(
        'Please, you can not access others users info',
      );
    }
    return this.prisma.user.update({
      data: updateUserDto,
      where: {
        id,
      },
    });
  }

  async auth(credentialsUserDto: CredentialsUserDto) {
    const { email, password } = credentialsUserDto;
    const user = await this.prisma.user.findUnique({
      where: { email: email },
    });

    if (user && (await this.validatePassword(password, user.password))) {
      const accessToken: string = await this.generateAccessToken({
        email: email,
      } as JwtPayload);
      return { accessToken };
    } else {
      throw new UnauthorizedException('Please check your login credentials');
    }
  }

  async hashPassword(password: string) {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  }

  async validatePassword(password: string, hashedpassword: string) {
    return bcrypt.compare(password, hashedpassword);
  }

  async generateAccessToken(jwtPayload: JwtPayload) {
    return this.jwtService.sign(jwtPayload);
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
