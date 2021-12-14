import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from './jwt-payload.interface';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { PublicUserDto } from '../users/dto/public-user.dto';
@Injectable()
export class JwtStrategyService extends PassportStrategy(Strategy) {
  constructor(
    private prismaService: PrismaService,
    private jwtService: JwtService,
  ) {
    super({
      secretOrKey: 'topSecret51',
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload: JwtPayload): Promise<PublicUserDto> {
    const { email } = payload;
    const user = await this.prismaService.user.findUnique({
      where: { email: email },
    });

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
