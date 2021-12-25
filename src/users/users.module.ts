import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { JwtStrategyService } from './auth/jwt-strategy/jwt-strategy.service';

import { PassportModule } from '@nestjs/passport';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AuthService } from './auth/auth.service';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY || 'topSecret51',
      signOptions: {
        expiresIn: 10800,
      },
    }),
  ],
  controllers: [UsersController],
  providers: [UsersService, JwtStrategyService, AuthService],
  exports: [JwtStrategyService, PassportModule],
})
export class UsersModule {}
