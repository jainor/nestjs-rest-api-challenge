import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UsePipes,
  ValidationPipe,
  UnauthorizedException,
} from '@nestjs/common';

import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from './decorators/get-user.decorator';
import { CredentialsUserDto } from './dto/credentials-user.dto';
import { UserDto } from './dto/user.dto';
import { AuthService } from './auth/auth.service';
import { plainToClass } from 'class-transformer';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @Post('signup')
  @UsePipes(new ValidationPipe({ transform: true }))
  async create(@Body() createUserDto: CreateUserDto) {
    const createUserHashedDto = {
      ...createUserDto,
      password: await this.authService.hashPassword(createUserDto.password),
    };
    return plainToClass(
      UserDto,
      await this.usersService.create(createUserHashedDto),
    );
  }

  @Get()
  @UseGuards(AuthGuard())
  async findAll() {
    return plainToClass(UserDto, await this.usersService.findAll());
  }
  @Post('signin')
  @UsePipes(new ValidationPipe({ transform: true }))
  signIn(@Body() credentialsUserDto: CredentialsUserDto) {
    return this.authService.auth(credentialsUserDto);
  }

  @Get('me')
  @UseGuards(AuthGuard())
  @UsePipes(new ValidationPipe({ transform: true }))
  findOne(@GetUser() user: UserDto) {
    return plainToClass(UserDto, this.usersService.findOneByEmail(user.email));
  }

  @Patch(':id')
  @UseGuards(AuthGuard())
  @UsePipes(new ValidationPipe({ transform: true }))
  update(
    @Param('id') id: number,
    @Body() updateUserDto: UpdateUserDto,
    @GetUser() user: UserDto,
  ) {
    if (id != user.id) {
      throw new UnauthorizedException(
        'Please, you can not access others users info',
      );
    }
    return plainToClass(UserDto, this.usersService.update(+id, updateUserDto));
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.usersService.remove(+id);
  }
}
