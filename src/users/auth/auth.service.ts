import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CredentialsUserDto } from '../dto/credentials-user.dto';
import * as bcrypt from 'bcrypt';
import { JwtPayload } from './jwt-strategy/jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';
import { plainToClass } from 'class-transformer';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}

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
